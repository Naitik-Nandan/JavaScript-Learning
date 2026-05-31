import { Cart } from '../../scripts/cart-class.js';

const cart = new Cart('cart-test');

describe('test suite: cart', () => {
    beforeEach(() => {
        spyOn(localStorage, 'setItem');
        cart.loadFromStorage();
    })

    it('adds an item to the cart', () => {

        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([]);
        });
        cart.loadFromStorage();
        cart.addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 1);
        console.log(cart);
        expect(cart.cartItems.length).toEqual(1);
        expect(cart.cartItems[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.cartItems[0].qty).toEqual(1);
        //expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([]));
    });

    it('add an existing item to the cart', () => {
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                qty: 1,
                deliveryOptionId: '1'
            }]);
        });
        cart.loadFromStorage();
        cart.addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 1);

        expect(cart.cartItems.length).toEqual(1);
        expect(cart.cartItems[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.cartItems[0].qty).toEqual(2);
        //expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([]));
    })
});

describe('test suite: updateDeliveryOptionId', () => {
    beforeEach(() => {
        spyOn(localStorage, 'setItem');
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return (JSON.stringify([{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                qty: 1,
                deliveryOptionId: '1'
            }]));
        });
        cart.loadFromStorage();
    });

    it('update Delivery Option', () => {
        cart.updateDeliveryOptionId('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', '3');
        expect(cart.cartItems[0]).toEqual({
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            qty: 1,
            deliveryOptionId: '3'
        })
    });

    it('update delivery option of a productId which is not in the cart', () => {
        cart.updateDeliveryOptionId('15b6fc6f-327a-4ec4-896f-486349e85a3d', '3');
        expect(localStorage.setItem).not.toHaveBeenCalledWith('cart', JSON.stringify(cart));
        cart.updateDeliveryOptionId('15b6fc6f-327a-4ec4-896f-486349e85a3d', '4');
        expect(localStorage.setItem).not.toHaveBeenCalledWith('cart', JSON.stringify(cart));

    })
})