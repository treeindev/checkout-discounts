"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FreeProduct = void 0;
var FreeProduct = /** @class */ (function () {
    function FreeProduct() {
    }
    /**
     * Executes a free product promotion.
     */
    FreeProduct.prototype.execute = function (checkout, rule) {
        // The provided rule must have a valid format.
        if (!rule.values.hasOwnProperty("type") ||
            !rule.values.hasOwnProperty("minimum_items") ||
            !rule.values.hasOwnProperty("free_units")) {
            throw ("The " + rule.code + " rule has invalid values, please review them and try again.");
        }
        // Purchase object used to store object-number relation
        var purchase = {};
        checkout.products.map(function (product) {
            if (purchase.hasOwnProperty(product.type)) {
                purchase[product.type]++;
                return;
            }
            purchase[product.type] = 1;
        });
        var _loop_1 = function (type, number) {
            // @ts-ignore
            if (number >= rule.values.minimum_items) {
                checkout.messages.push("You are getting " + rule.values.free_units + " " + type + " for free!");
                // Add new product to the checkout collection.
                // New product is a clone from an existing product type.
                var newProduct = __assign({}, checkout.products.find(function (product) { return product.type === type; }));
                newProduct.price = 0;
                checkout.products.push(newProduct);
            }
        };
        // In order to apply this promotion rule,
        // the total number of same item type has to be higher than the defined one.
        for (var _i = 0, _a = Object.entries(purchase); _i < _a.length; _i++) {
            var _b = _a[_i], type = _b[0], number = _b[1];
            _loop_1(type, number);
        }
        // This discount rule does not change the cost of the checkout,
        // It gives a free product message instead.
        return checkout;
    };
    return FreeProduct;
}());
exports.FreeProduct = FreeProduct;
