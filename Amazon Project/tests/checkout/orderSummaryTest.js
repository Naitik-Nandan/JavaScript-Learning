import { checkout, deleteItem } from '../../scripts/checkout/orderSummary.js';
import { cart } from '../../scripts/cart-class.js';
//import { Cart } from '../../scripts/cart-class.js';
import { loadProducts, loadProductsFetch } from '../../data/products.js';


beforeAll((done /*Provided by Jasmine for Asynchronous functions*/) => {
    loadProductsFetch().then(() => {
        done();
    })
})

describe('test suite: checkout', () => {
    const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    const productId2 = `15b6fc6f-327a-4ec4-896f-486349e85a3d`;
    beforeEach(() => {
        document.querySelector('.js-tests-container').innerHTML = `<div class="js-order"></div>`;
        const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
        const productId2 = `15b6fc6f-327a-4ec4-896f-486349e85a3d`;
        spyOn(localStorage, 'setItem');
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: productId1,
                quantity: 1,
                deliveryOptionId: '1'
            },
            {
                productId: productId2,
                quantity: 2,
                deliveryOptionId: '1'
            }]);
        });
        cart.loadFromStorage();
        checkout();
    });

    afterEach(() => {
        document.querySelector('.js-tests-container').innerHTML = '';
    })

    it('displays the cart', () => {
        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(2);
        expect(document.querySelector(`.js-qty-${productId1}`).innerText).toContain('Quantity: 1');
        expect(document.querySelector(`.js-name-${productId1}`).innerText).toEqual('Black and Gray Athletic Cotton Socks - 6 Pairs');
        expect(document.querySelector(`.js-price`).innerText).toContain('₹');
    });

    it('delete-an-item', () => {
        document.querySelector(`.js-del-${productId1}`).click();
        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(1);
        expect(document.querySelector(`.js-item-${productId1}`)).toEqual(null);
        expect(document.querySelector(`.js-item-${productId2}`)).not.toEqual(null);
        expect(cart.cartItems.length).toEqual(1);
        expect(cart.cartItems[0].productId).toEqual(productId2);
    })
});

describe('test suite: removeFromCart', () => {
    const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    const productId2 = `15b6fc6f-327a-4ec4-896f-486349e85a3d`;
    beforeEach(() => {
        document.querySelector('.js-tests-container').innerHTML = `<div class="js-order"></div>`;
        spyOn(localStorage, 'setItem');
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: productId1,
                quantity: 1,
                deliveryOptionId: '1'
            },
            {
                productId: productId2,
                quantity: 1,
                deliveryOptionId: '1'
            }]);
        });
        cart.loadFromStorage();
        checkout();
    })
    afterEach(() => {
        document.querySelector('.js-tests-container').innerHTML = '';
    })


    it('remove a product that is in the cart', () => {
        deleteItem(productId1);
        expect(document.querySelector(`.js-item-${productId1}`)).toEqual(null);
        expect(cart.cartItems.length).toEqual(1);
    });

    it('remove a product that is not in the cart', () => {
        deleteItem(productId2);
        expect(document.querySelector(`.js-item-${productId2}`)).toEqual(null);
        expect(cart.cartItems.length).toEqual(1);
    })
});

describe('test suite: deliveryOptions', () => {

    const productId1 = '83d4ca15-0f35-48f5-b7a3-1ea210004f2e';
    const productId2 = `15b6fc6f-327a-4ec4-896f-486349e85a3d`;
    beforeEach(() => {
        document.querySelector('.js-tests-container').innerHTML = `<div class="js-order"></div>`;
        spyOn(localStorage, 'setItem');
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: productId1,
                quantity: 1,
                deliveryOptionId: '1'
            },
            {
                productId: productId2,
                quantity: 2,
                deliveryOptionId: '1'
            }]);
        });
        cart.loadFromStorage();
        document.querySelector('.js-payment-summary').innerHTML = `<div class="checkout-grid">
        <div class="js-items-link"></div>

        <div class="order-summary js-order">
        </div>

        <div class="payment-summary">
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row js-items">
            <div></div>
            <div class="payment-summary-money js-subTotal"></div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money js-shipping"></div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money js-beforeTax"></div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money js-tax"></div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money js-total"></div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
        </div>
      </div>`;
        checkout();
    })
    afterEach(() => {
        document.querySelector('.js-tests-container').innerHTML = '';
        document.querySelector('.js-payment-summary').innerHTML = '';
    });

    it('update delivery options', () => {
        document.querySelector(`.js-delivery-${productId1}-and-3`).click();
        expect(document.querySelector(`.js-delivery-${productId1}-and-3`).checked);
        expect(cart.cartItems.length).toEqual(2);
        expect(document.querySelector(`.js-delivery-${productId1}-and-3`))
        expect(document.querySelector('.js-total').innerHTML).toEqual(`₹65.87`);
    });

    it('paymentSummary', () => {
        document.querySelector(`.js-delivery-${productId1}-and-3`).click();
        expect(document.querySelector('.js-shipping').innerHTML).toEqual('₹9.99');
        expect(document.querySelector('.js-beforeTax').innerHTML).toEqual('₹59.88');
        expect(document.querySelector('.js-tax').innerHTML).toEqual('₹5.99')
        expect(document.querySelector('.js-total').innerHTML).toEqual('₹65.87');

    })
})