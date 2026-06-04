import { subTotal, ShippingCosts } from "./orderSummary.js";
import { money } from "../utils/money.js";
import { cart } from "../cart-class.js";
import {addOrder} from '../../data/orders.js';

//const cart  = new Cart('cart');

export function renderPaymentSummary() {
    // Guard: these elements only exist on the real checkout page, not in tests
    if (!document.querySelector('.js-shipping')) return;

    let beforeTax = (subTotal + ShippingCosts);
    let tax = beforeTax * 0.1;
    const total = beforeTax + tax;
    document.querySelector('.js-shipping').innerHTML = `₹${money(ShippingCosts)}`;
    document.querySelector('.js-beforeTax').innerHTML = `₹${money(beforeTax)}`;
    document.querySelector('.js-tax').innerHTML = `₹${money(tax)}`;
    document.querySelector('.js-total').innerHTML = `₹${money(total)}`;

    document.querySelector('.js-items').innerHTML = ` <div>Items (${cart.updateCartQuantity()}):</div>
            <div class="payment-summary-money js-subTotal">₹${money(subTotal)}</div>`;
    document.querySelector('.js-items-link').innerHTML = `${cart.updateCartQuantity()} items`;
    document.querySelector('.js-place-order').addEventListener('click', async () => {
        console.log(cart.cartItems);
        try {
            const response = await fetch('https://supersimplebackend.dev/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    cart: cart.cartItems
                })
            });
            const order = await response.json();
            addOrder(order);
            console.log(order);
        } catch (error) {
            console.log('Unexpected Error,  try again later')
        };
        window.location.href = 'orders.html';
    });
}


