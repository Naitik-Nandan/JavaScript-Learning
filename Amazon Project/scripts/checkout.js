import { checkout } from "./checkout/orderSummary.js";
import '../data/car.js';
// import '../data/backend-practice.js';
import {
    loadProducts, /*CallBack*/
    loadProductsFetch
} from "../data/products.js";
import { loadCart } from "./cart-class.js";
import { cart } from "./cart-class.js";


async function loadPage() {
    try {
        //throw 'error'; //for throwing intentional error: synchronous
        await loadProductsFetch();
        const value = await new Promise((resolve, reject) => {
            //throw 'error1';
            //reject('error3'); //for getting out of promise and creating error -> asyncronous
            loadCart(() => {
                resolve();
            });
        });
    } catch (error) {
        console.log(error);
    };
    checkout();
};

loadPage();

/*
Promise.all([
    loadProductsFetch(),
    new Promise((resolve) => {
        loadCart(() => {
            resolve();
        });
    })
]).then((values) => {
    console.log(values[0]);
    checkout();
})
    */

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


