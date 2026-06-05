import { products, loadProducts, loadProductsFetch } from '../data/products.js'
//import { hello } from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';
import { cart } from './cart-class.js';
//console.log(hello());
//loadProducts(renderProductsGrid);
loadProductsFetch().then(() => {
  renderProductsGrid();;
});
const url = new URL(window.location.href);
const searchParams = url.searchParams.get('search')
function renderProductsGrid() {
  let productsHtml = '';
  cart.loadFromStorage();
  document.querySelector('.js-qty').innerHTML = cart.updateCartQuantity();
  console.log(cart.updateCartQuantity());
  // if (searchParams === '')
  // if (product.name.includes(url.searchParams.get('search')))
  products.forEach((product) => {
    if (!searchParams)
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
    else {
      if (product.name.toUpperCase().includes(searchParams.toUpperCase()))
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
    }

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
};

document.querySelector('.js-search').addEventListener('click', () => {
  const searchValue = document.querySelector('.js-search-bar').value;
  window.location.href = `amazon.html?search=${searchValue}`;
});

document.querySelector('.js-search-bar').addEventListener('keydown', (event) => {
  const searchValue = document.querySelector('.js-search-bar').value;
  if (event.key === 'Enter')
    window.location.href = `amazon.html?search=${searchValue}`;
});

