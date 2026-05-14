

let productsHtml = '';

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
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${(product.priceCents / 100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select>
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

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add2cart" data-product-id="${product.id}" data-product-name="${product.name}" 
          data-product-image="${product.image}"
          data-product-price="${product.priceCents/100}">
            Add to Cart
          </button>
        </div>`
});

document.querySelector('.js-products').innerHTML = productsHtml;
let k;
document.querySelectorAll('.js-add2cart').forEach((button) => {
  button.addEventListener('click', () => {
    const productId = button.dataset.productId;
    let isItem;
    cart.forEach((item) => {
      if (item.id === productId) {
        isItem = item;
      }
    });
    if (isItem)
      isItem.quantity++;
    else
      cart.push({
        name: button.dataset.productName,
        quantity: 1,
        id: button.dataset.productId,
        image: button.dataset.productImage,
        price: button.dataset.productPrice
      });
    localStorage.setItem('cart' , JSON.stringify(cart));
    k++;
  });
});

document.querySelector('.cart-quantity').innerHTML = k || 0;
