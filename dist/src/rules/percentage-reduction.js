"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PercentageReduction = void 0;
var PercentageReduction = /** @class */ (function () {
    function PercentageReduction() {
    }
    /**
     * Executes a percentage reduction discount.
     */
    PercentageReduction.prototype.execute = function (checkout, rule) {
        // The provided rule must have a valid format.
        if (!rule.values.hasOwnProperty("minimum_cost") || !rule.values.hasOwnProperty("discount_value")) {
            throw ("The " + rule.code + " rule has invalid values, please review them and try again.");
        }
        // In order to apply this discount rule,
        // the total cost must be higher than the defined minimum. 
        if (checkout.getProductCost() < rule.values.minimum_cost) {
            return checkout;
        }
        checkout.discount += checkout.getProductCost() * rule.values.discount_value / 100;
        checkout.messages.push("You are getting a " + rule.values.discount_value + "% discount!");
        return checkout;
    };
    return PercentageReduction;
}());
exports.PercentageReduction = PercentageReduction;
