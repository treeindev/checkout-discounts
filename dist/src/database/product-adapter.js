"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductAdapter = void 0;
var database_1 = require("./database");
/**
 * This is port that is used to connect to the inner layers of the system.
 * The Port exposes a set of methods that can be used to fetch data.
 * In a real project, this class would generate the string Queries to be passed to database class.
 */
var ProductAdapter = /** @class */ (function () {
    function ProductAdapter() {
        this.database = new database_1.Database();
    }
    /**
     * Retrieves a product based on a given id.
     */
    ProductAdapter.prototype.getProductById = function (id) {
        return this.database.products.find(function (product) { return product.id === id; });
    };
    /**
     * Adds a new product to the database.
     * The provided product ID must be unique.
     */
    ProductAdapter.prototype.addProduct = function (product) {
        if (this.database.products.find(function (p) { return p.id === product.id; })) {
            throw "Error: Given product ID:(" + product.id + ") already exists on the system.";
        }
        this.database.products.push(product);
    };
    return ProductAdapter;
}());
exports.ProductAdapter = ProductAdapter;
