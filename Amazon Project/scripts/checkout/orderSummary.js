import { products, loadProductsFetch } from '../../data/products.js';
import { money } from '../utils/money.js';
//import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { deliveryOptions, calculateDeliveryDate } from '../utils/deliveryOptions.js'
import { renderPaymentSummary } from './paymentSummary.js';
import { cart } from '../cart-class.js';
//import '../cart-oop.js';



export function deliveryOptionsHTML(item, cartItem) {

  let html = '';
  deliveryOptions.forEach((deliveryOption) => {
    const dateString = calculateDeliveryDate(deliveryOption);
    const priceString = (deliveryOption.priceCents > 0) ? `$${money(deliveryOption.priceCents)}` : 'FREE';

    html += `<div class="delivery-option">
                  <input type="radio" class="delivery-option-input js-delivery-option js-delivery-${item.id}-and-${deliveryOption.id}" ${cartItem.deliveryOptionId === deliveryOption.id ? 'checked' : ''}
                    name="delivery-option-${item.id}" 
                    data-product-id = ${item.id}
                    data-delivery-option-id = ${deliveryOption.id}>
                  <div>
                    <div class="delivery-option-date">
                      ${dateString}
                    </div>
                    <div class="delivery-option-price">
                      ${priceString} - Shipping
                    </div>
                  </div>
                </div>`

  })
  return html;
}

export let subTotal = 0;
export let ShippingCosts = 0;

export async function checkout() {
  await loadProductsFetch();

  subTotal = 0;
  ShippingCosts = 0;

  let cartHTML = "";

  cart.cartItems.forEach((cartItem) => {
    let item;
    products.forEach((product) => {
      if (cartItem.productId === product.id)
        item = product;
    })

    let deliveryOption;
    const { deliveryOptionId } = cartItem;
    deliveryOptions.forEach((option) => {
      if (deliveryOptionId === option.id)
        deliveryOption = option;
    });
    const dateString = calculateDeliveryDate(deliveryOption);
    cartHTML += `<div class="cart-item-container js-item-${item.id} js-cart-item-container">
            <div class="delivery-date">
              Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src=${item.image}>

              <div class="cart-item-details">
                <div class="product-name js-name-${item.id}" data-product-name = ${item.name}>
                  ${item.name}
                </div>
                <div class="product-price js-price">
                  ${item.getPrice()}
                </div>
                <div class="product-quantity js-qty-${item.id}">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update" data-product-id="${item.id}">
                    Update
                  </span>
                  <input class="quantity-input">
                  <span class="save-quantity-link link-primary">Save</span>
                  <span class="delete-quantity-link link-primary js-del js-del-${item.id}" data-product-id="${item.id}">
                    Delete
                  </span>
                </div>
              </div>
              
              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                  ${deliveryOptionsHTML(item, cartItem)}
              </div>
            </div>
          </div>`;
    subTotal += item.priceCents * cartItem.quantity;
    ShippingCosts += deliveryOption.priceCents;
  });

  if (document.querySelector('.js-order'))
    document.querySelector('.js-order').innerHTML = cartHTML;

  document.querySelectorAll('.js-del').forEach((link) => {
    link.addEventListener('click', () => {
      let itemId = link.dataset.productId;
      console.log(itemId);
      deleteItem(itemId);
    })
  })

  document.querySelectorAll('.js-update').forEach((link) => {

    const { productId } = link.dataset;
    link.addEventListener('click', () => {
      document.querySelector(`.js-item-${productId}`).classList.add('is-editing-quantity');
      document.querySelectorAll('.save-quantity-link').forEach((saveButton) => {
        saveButton.addEventListener('click', () => {
          updateItemCartQuantity(productId);

        })
      })
      document.querySelectorAll('.quantity-input').forEach((inputBox) => {
        inputBox.addEventListener('keydown', (event) => {
          if (event.key === 'Enter') {
            updateItemCartQuantity(productId);
          }
        })
      })
    })
  })

  document.querySelectorAll('.js-delivery-option').forEach((input) => {
    input.addEventListener('click', () => {
      const { productId, deliveryOptionId } = input.dataset;
      cart.updateDeliveryOptionId(productId, deliveryOptionId);
      checkout();
    })
  })

  renderPaymentSummary();

};

function updateItemCartQuantity(productId) {
  let qty = (Number)(document.querySelector('.quantity-input').value);
  if (qty > 0 && qty < 1000)
    cart.updateQuantity(productId, qty);
  else
    alert('Enter an appropriate Number');
  checkout();
  document.querySelector(`.js-item-${productId}`).classList.remove('is-editing-quantity');
}


export function deleteItem(itemId) {
  let i;
  for (i = 0; i < cart.cartItems.length; i++) {
    if (itemId === cart.cartItems[i].productId)
      break;
  }
  cart.cartItems.splice(i, 1);
  console.log(cart);
  cart.saveToStorage();
  checkout();
};