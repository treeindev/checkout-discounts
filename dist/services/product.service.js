"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
var ProductService = /** @class */ (function () {
    function ProductService(database) {
        this.database = database;
    }
    ProductService.prototype.getById = function (id) {
        var product = this.database.getProductById(id);
        if (!product) {
            throw "Error: Given product ID:(" + id + ") does not match any product on the system.";
        }
        return product;
    };
    ProductService.prototype.addProduct = function (id, type, name, price) {
        var product = {
            id: id,
            type: type,
            name: name,
            price: price
        };
        this.database.addProduct(product);
    };
    return ProductService;
}());
exports.ProductService = ProductService;
