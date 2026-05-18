<<<<<<< HEAD
let cartHTML = "";
cart.forEach((item) => {
    cartHTML += `<div class="cart-item-container">
            <div class="delivery-date">
              Delivery date: Wednesday, June 15
=======
let checkoutHtml = '';

cart.forEach((item) => {
  checkoutHtml += `<div class="cart-item-container">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
>>>>>>> 6b0b960b1b6bccb2d1fa14cd63c747e33ea157cd
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
<<<<<<< HEAD
                src=${item.image}>
=======
                src="${item.image}">
>>>>>>> 6b0b960b1b6bccb2d1fa14cd63c747e33ea157cd

              <div class="cart-item-details">
                <div class="product-name">
                  ${item.name}
                </div>
                <div class="product-price">
                  $${item.price}
                </div>
                <div class="product-quantity">
                  <span>
<<<<<<< HEAD
                    Quantity: <span class="quantity-label">${item.qty}</span>
=======
                    Quantity: <span class="quantity-label">${item.quantity}</span>
>>>>>>> 6b0b960b1b6bccb2d1fa14cd63c747e33ea157cd
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
<<<<<<< HEAD

                <div class="delivery-option">
                  <input type="radio" class="delivery-option-input"
                    name="delivery-option-2">
=======
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${item.id}">
>>>>>>> 6b0b960b1b6bccb2d1fa14cd63c747e33ea157cd
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
<<<<<<< HEAD
                  <input type="radio" checked class="delivery-option-input"
                    name="delivery-option-2">
=======
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${item.id}">
>>>>>>> 6b0b960b1b6bccb2d1fa14cd63c747e33ea157cd
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
<<<<<<< HEAD
                  <input type="radio" class="delivery-option-input"
                    name="delivery-option-2">
=======
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${item.id}">
>>>>>>> 6b0b960b1b6bccb2d1fa14cd63c747e33ea157cd
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
});

<<<<<<< HEAD


document.querySelector('.js-order').innerHTML = cartHTML;

let subTotal = 0;
cart.forEach((item) => {
    subTotal+=(Number)(item.price);
})

document.querySelector('.js-subTotal').innerHTML = subTotal;
=======
if (cart.length === 0) {
  checkoutHtml = '<p style="padding: 20px;">Your cart is empty. <a href="amazon.html">Continue shopping</a></p>';
}

document.querySelector('.js-checkout').innerHTML = checkoutHtml;
>>>>>>> 6b0b960b1b6bccb2d1fa14cd63c747e33ea157cd
