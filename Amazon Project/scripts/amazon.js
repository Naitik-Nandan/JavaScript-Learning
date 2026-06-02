import { products, loadProducts } from '../data/products.js'
//import { hello } from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';
import { cart } from './cart-class.js';
//console.log(hello());
loadProducts(renderProductsGrid);
function renderProductsGrid() {
  let productsHtml = '';
  cart.loadFromStorage();
  document.querySelector('.js-qty').innerHTML = cart.updateCartQuantity();
  console.log(cart.updateCartQuantity());

  products.forEach((product) => {
    productsHtml += `<div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="${product.getStarsURL()}">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            ${product.getPrice()}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          ${product.extraInfoHTML()}

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add2cart" 
          data-product-name="${product.name}"
          data-product-image="${product.image}"
          data-product-price=${product.getPrice()}
          data-product-id=${product.id}>
            Add to Cart
          </button>
        </div>`;
  });

  document.querySelector('.js-products').innerHTML = productsHtml;

  document.querySelectorAll('.js-add2cart').forEach((button) => {
    button.addEventListener('click', () => {
      const { productId } = button.dataset;
      const qty = (Number)(document.querySelector(`.js-quantity-selector-${productId}`).value);
      cart.addToCart(productId, qty);
      document.querySelector('.js-qty').innerHTML = cart.updateCartQuantity();
    });
  });
}