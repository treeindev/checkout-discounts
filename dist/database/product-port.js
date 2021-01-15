"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductPort = void 0;
var database_1 = require("./database");
var ProductPort = /** @class */ (function () {
    function ProductPort() {
        this.database = new database_1.Database();
    }
    ProductPort.prototype.getProductById = function (id) {
        return this.database.products.find(function (product) { return product.id === id; });
    };
    ProductPort.prototype.addProduct = function (product) {
        if (this.database.products.find(function (p) { return p.id === product.id; })) {
            throw "Error: Given product ID:(" + product.id + ") already exists on the system.";
        }
        this.database.products.push(product);
    };
    return ProductPort;
}());
exports.ProductPort = ProductPort;
