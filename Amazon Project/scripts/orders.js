import { orders } from '../data/orders.js';
import { products, loadProductsFetch } from '../data/products.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { money } from './utils/money.js';
import { cart } from './cart-class.js';

let ordersHTML = '';

console.log(orders);

async function loadPage() {
    await loadProductsFetch();
    console.log(products);

    orders.forEach((order) => {
        ordersHTML += `
            <div class="order-container">
                <div class="order-header">
                    <div class="order-header-left-section">
                        <div class="order-date">
                            <div class="order-header-label">Order Placed:</div>
                            <div>${dayjs(order.orderTime).format('MMMM D')}</div>
                        </div>
                        <div class="order-total">
                            <div class="order-header-label">Total:</div>
                            <div>₹${money(order.totalCostCents)}</div>
                        </div>
                    </div>
                    <div class="order-header-right-section">
                        <div class="order-header-label">Order ID:</div>
                        <div>${order.id}</div>
                    </div>
                </div>
                <div class="order-details-grid">`;

        order.products.forEach((product) => {
            products.forEach((item) => {
                if (product.productId === item.id) {
                    const orderedProduct = item;
                    ordersHTML += `<div class="product-image-container">
                            <img src="${orderedProduct.image}">
                        </div>
                        <div class="product-details">
                            <div class="product-name">
                                ${orderedProduct.name}
                            </div>
                            <div class="product-delivery-date">
                                ${dayjs(product.estimatedDeliveryTime).format('MMMM D')}
                            </div>
                            <div class="product-quantity">
                                Quantity: ${product.quantity}
                            </div>
                            <button class="buy-again-button button-primary js-buy-it-again" data-product-id="${product.productId}">
                                <img class="buy-again-icon" src="images/icons/buy-again.png">
                                <span class="buy-again-message">Buy it again</span>
                            </button>
                        </div>
                        <div class="product-actions">
                            <a href="tracking.html?orderId=${order.id}&productId=${product.productId}">
                                <button class="track-package-button button-secondary js-tracking-button" data-order-id=${order.id} data-product-id="${product.productId}">
                                    Track package
                                </button>
                            </a>
                        </div>`;
                }
            });
        });

        ordersHTML += `</div>
            </div>`;
    });

    document.querySelector('.js-order-grid').innerHTML = ordersHTML;
    document.querySelectorAll('.js-buy-it-again').forEach((button) => {
        button.addEventListener('click', () => {
            localStorage.removeItem('cart');
            const productId = button.dataset.productId;
            let orderedProduct;
            products.forEach((item) => {
                if (productId === item.id) {
                    orderedProduct = item;
                    cart.addToCart(productId, 1);
                }
            });
            document.querySelector('.js-qty').innerHTML = cart.updateCartQuantity();
        });
        document.querySelector('.js-qty').innerHTML = 0;
        cart.saveToStorage();
    });


}

loadPage();
