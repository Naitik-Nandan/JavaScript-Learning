


export class Cart {
    cartItems = [];
    #localStorageKey;
    constructor(localStorageKey) {
        this.#localStorageKey = localStorageKey;
        this.loadFromStorage();
    }

    loadFromStorage() {
        this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [];
    }

    resetCart() {
        this.cartItems.length = 0;
    }

    saveToStorage() {
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
    }

    timeoutId = undefined;
    addToCart(productId, qty) {
        let match;
        this.cartItems.forEach((cartItem) => {
            if (productId === cartItem.productId)
                match = cartItem;
        });
        if (!match) {
            this.cartItems.push({
                productId, qty, deliveryOptionId: '1'
            });
        } else {
            match.qty += qty;
        }

        const addedEl = document.querySelector(`.js-added-${productId}`);
        if (addedEl) {
            addedEl.classList.add('added');
            this.timeoutGame(this.timeoutId, productId);
        }
        this.saveToStorage();

    }


    timeoutGame(timeoutId, productId) {
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

    updateCartQuantity() {
        let totalQty = 0;
        this.cartItems.forEach((cartItem) => {
            totalQty += cartItem.qty;
        });
        return totalQty;
    }


    updateQuantity(productId, qty) {
        this.cartItems.forEach((item) => {
            if (item.productId === productId)
                item.qty = qty;
        });
        this.saveToStorage();
    }

    updateDeliveryOptionId(productId, deliveryOptionId) {
        let matchingItem;
        this.cartItems.forEach((cartItem) => {
            if (cartItem.productId === productId)
                matchingItem = cartItem;
        })

        if (!matchingItem)
            return;

        if (deliveryOptionId !== '1' && deliveryOptionId !== '2' && deliveryOptionId !== '3')
            return;

        matchingItem.deliveryOptionId = deliveryOptionId;
        this.saveToStorage();
    }

};

export const cart = new Cart('cart');

/*const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');
console.log(cart);
//cart.addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 1);
//cart.#localStorageKey = 'yo'; //will not work
console.log(businessCart);
console.log(businessCart instanceof Cart);
*/
export function loadCart(fun) {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', () => {
        console.log(xhr.response);
        fun();
    });
    xhr.open('GET', 'https://supersimplebackend.dev/cart');
    xhr.send();
};