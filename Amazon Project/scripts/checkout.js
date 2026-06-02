import { checkout } from "./checkout/orderSummary.js";
import '../data/car.js';
// import '../data/backend-practice.js';
import { loadProducts /*CallBack*/} from "../data/products.js";


loadProducts(checkout);