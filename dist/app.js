"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckoutApp = void 0;
var product_service_1 = require("./services/product.service");
var product_port_1 = require("./database/product-port");
var CheckoutApp = /** @class */ (function () {
    function CheckoutApp() {
        this.products = [];
        this.productService = new product_service_1.ProductService(new product_port_1.ProductPort());
    }
    CheckoutApp.prototype.add = function (id, type, name, price) {
        try {
            this.productService.addProduct(id, type, name, price);
        }
        catch (e) {
            console.error(e);
        }
    };
    CheckoutApp.prototype.scan = function (productId) {
        try {
            this.products.push(this.productService.getById(productId));
        }
        catch (e) {
            console.error(e);
        }
    };
    CheckoutApp.prototype.result = function () {
        console.log(this.products);
    };
    return CheckoutApp;
}());
exports.CheckoutApp = CheckoutApp;
