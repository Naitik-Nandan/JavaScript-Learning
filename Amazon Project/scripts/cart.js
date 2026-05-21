export const cart = JSON.parse(localStorage.getItem('cart')) || [];

let timeoutId = false;
export const addToCart = (productId, qty) => {
  let match;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId)
      match = cartItem;
  });
  if (!match) {
    cart.push({
      productId, qty
    });
  } else {
    match.qty += qty;
  }


  document.querySelector(`.js-added-${productId}`).classList.add('added');

  if (timeoutId) {
    clearTimeout(timeoutId);
  }

  timeoutId = setTimeout(() => {
    document.querySelector(`.js-added-${productId}`).classList.remove('added');
    timeoutId = false;
  }, 2000);
}



export function updateCartQuantity() {
  let totalQty = 0;
  cart.forEach((cartItem) => {
    totalQty += cartItem.qty;
  });
  document.querySelector('.js-qty').innerHTML = totalQty;
}
