import { cart, updateCartQuantity, updateQuantity } from '../scripts/cart.js'
import { products } from '../data/products.js';
import { money } from './utils/money.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import {deliveryOptions} from './utils/deliveryOptions.js'

console.log(dayjs());

const today = dayjs();
const deliveryDate = today.add(7 , 'days');
console.log(deliveryDate.format('dddd, MMMM D'));

function checkout() {

  let cartHTML = "";
  let subTotal = 0;
  cart.forEach((cartItem) => {
    let item;
    products.forEach((product) => {
      if (cartItem.productId === product.id)
        item = product;
    })

    cartHTML += `<div class="cart-item-container js-item-${item.id}">
            <div class="delivery-date">
              Delivery date: Wednesday, June 15
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src=${item.image}>

              <div class="cart-item-details">
                <div class="product-name">
                  ${item.name}
                </div>
                <div class="product-price">
                  $${item.priceCents / 100}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.qty}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update" data-product-id="${item.id}">
                    Update
                  </span>
                  <input class="quantity-input">
                  <span class="save-quantity-link link-primary">Save</span>
                  <span class="delete-quantity-link link-primary js-del" data-product-id="${item.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>

                <div class="delivery-option">
                  <input type="radio" class="delivery-option-input"
                    name="delivery-option-${item.id}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio" checked class="delivery-option-input"
                    name="delivery-option-${item.id}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio" class="delivery-option-input"
                    name="delivery-option-${item.id}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>`;
    subTotal += item.priceCents * cartItem.qty;
  });

  let beforeTax = (subTotal + 499);
  let tax = beforeTax * 0.1;
  const total = beforeTax + tax;
  document.querySelector('.js-beforeTax').innerHTML = `$${money(beforeTax)}`;
  document.querySelector('.js-tax').innerHTML = `$${money(tax)}`;
  document.querySelector('.js-total').innerHTML = `$${money(total)}`;

  document.querySelector('.js-items').innerHTML = ` <div>Items (${updateCartQuantity()}):</div>
            <div class="payment-summary-money js-subTotal">$${money(subTotal)}</div>`;
  document.querySelector('.js-items-link').innerHTML = `${updateCartQuantity()} items`;
  document.querySelector('.js-order').innerHTML = cartHTML;

  document.querySelectorAll('.js-del').forEach((link) => {
    link.addEventListener('click', () => {
      let itemId = link.dataset.productId;
      console.log(itemId);
      let i;
      for (i = 0; i < cart.length; i++) {
        if (itemId === cart[i].productId)
          break;
      }
      cart.splice(i, 1);
      console.log(cart);
      document.querySelector(`.js-item-${itemId}`).remove();
      localStorage.setItem('cart', JSON.stringify(cart));
      checkout();
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
};

checkout();

function updateItemCartQuantity(productId) {
  let qty = (Number)(document.querySelector('.quantity-input').value);
  if (qty > 0 && qty < 1000)
    updateQuantity(productId, qty);
  else
    alert('Enter an appropriate Number');
  checkout();
  document.querySelector(`.js-item-${productId}`).classList.remove('is-editing-quantity');
}
