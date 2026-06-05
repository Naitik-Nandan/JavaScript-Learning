import { products, loadProductsFetch } from '../data/products.js';
import { orders } from '../data/orders.js'
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
const url = new URL(window.location.href);
const orderId = url.searchParams.get('orderId');
const productId = url.searchParams.get('productId');
let trackingHTML = '';
if (!orderId || !productId) {
  trackingHTML = '';
};
let matchingItem;
let matchingOrder;
let mathcingOrderedProduct;
const now = dayjs();
async function loadProducts() {
  await loadProductsFetch();
  products.forEach((product) => {
    if (product.id === productId)
      matchingItem = product;
  });
  orders.forEach((order) => {
    console.log(order);
    if (order.id === orderId)
      matchingOrder = order;
  });
  matchingOrder.products.forEach((product) => {
    if (product.productId === productId)
      mathcingOrderedProduct = product;
  });

  const deliveryProgress = (now.diff(dayjs(matchingOrder.orderTime)) / dayjs(mathcingOrderedProduct.estimatedDeliveryTime).diff(dayjs(matchingOrder.orderTime))) * 100;
  console.log(deliveryProgress);

  trackingHTML = `
    <a class="back-to-orders-link link-primary" href="orders.html">
        View all orders
      </a>
    <div class="delivery-date">
        ${deliveryProgress < 100 ? `Arriving on ${dayjs(matchingOrder.orderTime).format('dddd, MMMM D')}` : `Delivered On ${dayjs(mathcingOrderedProduct.estimatedDeliveryTime).format('dddd, MMMM D')}`} 
      </div>

      <div class="product-info">
        ${matchingItem.name}
      </div>

      <div class="product-info">
        Quantity: ${mathcingOrderedProduct.quantity}
      </div>

      <img class="product-image" src="${matchingItem.image}">

      <div class="progress-labels-container">
        <div class="progress-label preparing">
          Preparing
        </div>
        <div class="progress-label shipping">
          Shipped
        </div>
        <div class="progress-label delivered">
          Delivered
        </div>
      </div>

      <div class="progress-bar-container">
        <div class="progress-bar" style="width: ${deliveryProgress}%"></div>
      </div>`;
  document.querySelector('.js-order-tracking-grid').innerHTML = trackingHTML;
  currentStatusFinder(deliveryProgress);
};
loadProducts();

function currentStatusFinder(deliveryProgress) {
  if (deliveryProgress >= 0 && deliveryProgress < 50)
    document.querySelector('.preparing').classList.add('current-status');
  else if (deliveryProgress >= 50 && deliveryProgress < 100)
    document.querySelector('.shipping').classList.add('current-status');
  else if (deliveryProgress >= 100)
    document.querySelector('.delivered').classList.add('current-status');
}