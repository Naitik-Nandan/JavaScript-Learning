import { subTotal, ShippingCosts } from "./orderSummary.js";
import { money } from "../utils/money.js";
import { updateCartQuantity } from "../cart.js";

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

    document.querySelector('.js-items').innerHTML = ` <div>Items (${updateCartQuantity()}):</div>
            <div class="payment-summary-money js-subTotal">₹${money(subTotal)}</div>`;
    document.querySelector('.js-items-link').innerHTML = `${updateCartQuantity()} items`;
}