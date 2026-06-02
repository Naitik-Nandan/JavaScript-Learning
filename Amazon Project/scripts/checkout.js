import { checkout } from "./checkout/orderSummary.js";
import '../data/car.js';
// import '../data/backend-practice.js';
import { loadProducts /*CallBack*/ } from "../data/products.js";
import { loadCart } from "./cart-class.js";


Promise.all([
    new Promise((resolve) => {
        loadProducts(() => {
            resolve('value I');
        })
    }),
    new Promise((resolve) => {
        loadCart(() => {
            resolve();
        });
    })
]).then((values) => {
    console.log(values[0]);
    checkout();
})

/*
new Promise((resolve) => {
    loadProducts(() => {
        resolve('value I');
    })
}).then((value) => {
    console.log(value);
    return new Promise((resolve) => {
        loadCart(() => {
            resolve();
        });
    });
}).then(() => {
    checkout();
});
*/

/*
loadProducts(checkout);
*/