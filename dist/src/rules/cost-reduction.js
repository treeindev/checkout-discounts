"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CostReduction = void 0;
var CostReduction = /** @class */ (function () {
    function CostReduction() {
    }
    /**
     * Executes a cost reduction discount.
     */
    CostReduction.prototype.execute = function (checkout, rule) {
        // The provided rule must have a valid format.
        if (!rule.values.hasOwnProperty("type") ||
            !rule.values.hasOwnProperty("minimum_items") ||
            !rule.values.hasOwnProperty("new_cost")) {
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
                checkout.products = checkout.products.map(function (product) {
                    if (product.type !== type) {
                        return product;
                    }
                    product.price = rule.values.new_cost;
                    return product;
                });
                checkout.messages.push("New price for " + type + ", all items for: " + rule.values.new_cost + "\u20AC!");
            }
        };
        // In order to apply this promotion rule,
        // the total number of same item type has to be higher than the defined one.
        for (var _i = 0, _a = Object.entries(purchase); _i < _a.length; _i++) {
            var _b = _a[_i], type = _b[0], number = _b[1];
            _loop_1(type, number);
        }
        return checkout;
    };
    return CostReduction;
}());
exports.CostReduction = CostReduction;
