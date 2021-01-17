"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
/**
 * This service handles the logic related to products.
 * The service does not concern where data is fetched from.
 * It uses interfaces to specify the required methods to fetch data.
 */
var ProductService = /** @class */ (function () {
    function ProductService(database) {
        this.database = database;
    }
    /**
     * Gets a product by a given ID.
     * An error if the provided ID does not exist.
     */
    ProductService.prototype.getById = function (id) {
        var product = this.database.getProductById(id);
        if (!product) {
            throw "Error: Given product ID:(" + id + ") does not match any product on the system.";
        }
        return product;
    };
    /**
     * Adds a new product to the system.
     * The service handles the format validation of the data.
     */
    ProductService.prototype.addProduct = function (id, type, name, price) {
        if (!id || !type || !name || !price) {
            throw "Provided product details are not valid.";
        }
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
