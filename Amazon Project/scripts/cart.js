import { checkout } from "./checkout/orderSummary.js";
export let cart;

export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem('cart')) || [];
}

loadFromStorage();

export function resetCart() {
  cart.length = 0;
}

let timeoutId;
export const addToCart = (productId, qty) => {
  let match;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId)
      match = cartItem;
  });
  if (!match) {
    cart.push({
      productId, qty, deliveryOptionId: '1'
    });
  } else {
    match.qty += qty;
  }

  const addedEl = document.querySelector(`.js-added-${productId}`);
  if (addedEl) {
    addedEl.classList.add('added');
    timeoutGame(timeoutId, productId);
  }

}


function timeoutGame(timeoutId, productId) {
  if (timeoutId) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      document.querySelector(`.js-added-${productId}`).classList.remove('added');
    }, 2000);
  }
  else {
    timeoutId = setTimeout(() => {
      document.querySelector(`.js-added-${productId}`).classList.remove('added');
    }, 2000);
  }
  console.log(timeoutId);
}

export function updateCartQuantity() {
  let totalQty = 0;
  cart.forEach((cartItem) => {
    totalQty += cartItem.qty;
  });
  if (totalQty <= 0)
    totalQty = 'No';
  return totalQty;
}


export function updateQuantity(productId, qty) {
  cart.forEach((item) => {
    if (item.productId === productId)
      item.qty = qty;
  });
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function updateDeliveryOptionId(productId, deliveryOptionId) {
  let matchingItem;
  cart.forEach((cartItem) => {
    if (cartItem.productId === productId)
      matchingItem = cartItem;
  })
  matchingItem.deliveryOptionId = deliveryOptionId;
  localStorage.setItem('cart', JSON.stringify(cart));
  checkout();
}