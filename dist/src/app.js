"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckoutApp = void 0;
var product_service_1 = require("./services/product.service");
var product_adapter_1 = require("./database/product-adapter");
var rule_service_1 = require("./services/rule.service");
var rule_adapter_1 = require("./database/rule-adapter");
var checkout_service_1 = require("./services/checkout-service");
var CheckoutApp = /** @class */ (function () {
    function CheckoutApp() {
        this.products = [];
        this.rules = [];
        this.productService = new product_service_1.ProductService(new product_adapter_1.ProductAdapter());
        this.ruleService = new rule_service_1.RuleService(new rule_adapter_1.RuleAdapter());
        this.checkoutService = new checkout_service_1.CheckoutService();
    }
    /**
     * Method used to add a new product to the system.
     */
    CheckoutApp.prototype.add = function (id, type, name, price) {
        try {
            this.productService.addProduct(id, type, name, price);
        }
        catch (e) {
            console.error(e);
            return false;
        }
    };
    /**
     * Method to scan a product and add it to the internal checkout collection.
     * The provided ID must exist or application will return error.
     */
    CheckoutApp.prototype.scan = function (productId) {
        try {
            this.products.push(this.productService.getById(productId));
            return true;
        }
        catch (e) {
            console.error(e);
            return false;
        }
    };
    /**
     * Method to apply a collection of rules to the checkout system.
     * Rules won't be applied until the result method is called.
     */
    CheckoutApp.prototype.setRules = function (collection) {
        var _this = this;
        try {
            var rules = collection.map(function (rule) { return _this.ruleService.getByCode(rule); });
            this.rules = __spreadArrays(this.rules, rules);
            return true;
        }
        catch (e) {
            console.error(e);
            return false;
        }
    };
    /**
     * Final step on the checkout process.
     * This method outputs the final cost of the current checkout execution.
     */
    CheckoutApp.prototype.result = function () {
        // console.log(this.products, this.rules);
        try {
            var result = this.checkoutService.applyRules(this.products, this.rules);
            console.log("The total checkout price is: " + result.getTotal() + "\u20AC");
            result.messages.map(function (message) { return console.log(message); });
            return result.getTotal();
        }
        catch (e) {
            console.error(e);
            return false;
        }
    };
    return CheckoutApp;
}());
exports.CheckoutApp = CheckoutApp;
