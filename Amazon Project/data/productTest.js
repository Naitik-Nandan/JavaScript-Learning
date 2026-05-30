import { Product, Clothing, Appliance } from "./products.js"
import { money } from "../scripts/utils/money.js";

describe('test suite: Product', () => {
    it('product', () => {
        const testProduct = {
            id: "54e0eccd-8f36-462b-b68a-8182611d9add",
            image: "images/products/black-2-slot-toaster.jpg",
            name: "2 Slot Toaster - Black",
            rating: {
                stars: 5,
                count: 2197
            },
            priceCents: 1899,
            keywords: [
                "toaster",
                "kitchen",
                "appliances"
            ],
            type: 'appliance',
            instructionsLink: 'images/appliance-instructions.png',
            warrantyLink: 'images/appliance-warranty.png'
        };
        const product = new Product(testProduct);
        expect(product.id).toEqual(testProduct.id);
        expect(product.priceCents).toEqual(testProduct.priceCents);
        expect(product.name).toEqual(testProduct.name);
        expect(product.getPrice()).toEqual(`₹${money(testProduct.priceCents)}`);
    })
});

describe('test suite: Clothing', () => {
    it('Clothing', () => {
        const testProduct = {
            id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
            image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
            name: "Adults Plain Cotton T-Shirt - 2 Pack",
            rating: {
                stars: 4.5,
                count: 56
            },
            priceCents: 799,
            keywords: [
                "tshirts",
                "apparel",
                "mens"
            ],
            type: "clothing", //discriminator property
            sizeChartLink: "images/clothing-size-chart.png"
        }
        const product = new Clothing(testProduct);
        expect(product.id).toEqual(testProduct.id);
        expect(product.priceCents).toEqual(testProduct.priceCents);
        expect(product.name).toEqual(testProduct.name);
        expect(product.getPrice()).toEqual(`₹${money(testProduct.priceCents)}`);
        expect(product.type).toEqual('clothing')
        expect(product.extraInfoHTML()).toEqual('<a href="images/clothing-size-chart.png" target = "_blank">Size Chart Link</a>')
    });
});

describe('test suite: Appliance', () => {
    it('Clothing', () => {
        const testProduct = {
            id: "54e0eccd-8f36-462b-b68a-8182611d9add",
            image: "images/products/black-2-slot-toaster.jpg",
            name: "2 Slot Toaster - Black",
            rating: {
                stars: 5,
                count: 2197
            },
            priceCents: 1899,
            keywords: [
                "toaster",
                "kitchen",
                "appliances"
            ],
            type: 'appliance',
            instructionsLink: 'images/appliance-instructions.png',
            warrantyLink: 'images/appliance-warranty.png'
        };
        const product = new Appliance(testProduct);
        expect(product.id).toEqual(testProduct.id);
        expect(product.priceCents).toEqual(testProduct.priceCents);
        expect(product.name).toEqual(testProduct.name);
        expect(product.getPrice()).toEqual(`₹${money(testProduct.priceCents)}`);
        expect(product.type).toEqual('appliance')
        expect(product.extraInfoHTML()).toEqual(`
    <a href="images/appliance-instructions.png" target="_blank">Instructions</a>
    <a href="images/appliance-warranty.png" target="_blank">Warranty.</a>
    `)
    });
});