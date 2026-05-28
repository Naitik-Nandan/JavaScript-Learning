import { checkout } from '../../scripts/checkout/orderSummary.js';
import { loadFromStorage, cart } from '../../scripts/cart.js';

describe('test suite: checkout', () => {
    const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    const productId2 = `15b6fc6f-327a-4ec4-896f-486349e85a3d`;
    beforeEach(() => {
        document.querySelector('.js-tests-container').innerHTML = `<div class="js-order"></div>`;
        const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
        const productId2 = `15b6fc6f-327a-4ec4-896f-486349e85a3d`;
        spyOn(localStorage, 'setItem').and.callFake(() => {
        })
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: productId1,
                qty: 1,
                deliveryOptionId: '1'
            },
            {
                productId: productId2,
                qty: 2,
                deliveryOptionId: '1'
            }]);
        });
        loadFromStorage();
        checkout();
    });

    afterEach(() => {
        document.querySelector('.js-tests-container').innerHTML = '';
    })

    it('displays the cart', () => {
        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(2);
        expect(document.querySelector(`.js-qty-${productId1}`).innerText).toContain('Quantity: 1');
    });

    it('delete-an-item', () => {
        document.querySelector(`.js-del-${productId1}`).click();
        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(1);
        expect(document.querySelector(`.js-item-${productId1}`)).toEqual(null);
        expect(document.querySelector(`.js-item-${productId2}`)).not.toEqual(null);
        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toEqual(productId2);
    })
})