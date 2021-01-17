"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AmountReduction = void 0;
var AmountReduction = /** @class */ (function () {
    function AmountReduction() {
    }
    /**
     * Executes an amount reduction discount.
     */
    AmountReduction.prototype.execute = function (checkout, rule) {
        // The provided rule must have a valid format.
        if (!rule.values.hasOwnProperty("minimum_cost") || !rule.values.hasOwnProperty("discount_value")) {
            throw ("The " + rule.code + " rule has invalid values, please review them and try again.");
        }
        // In order to apply this discount rule,
        // the total cost must be higher than the defined minimum. 
        if (checkout.getProductCost() < rule.values.minimum_cost) {
            return checkout;
        }
        checkout.discount += rule.values.discount_value;
        checkout.messages.push("You are getting a " + rule.values.discount_value + "\u20AC discount!");
        return checkout;
    };
    return AmountReduction;
}());
exports.AmountReduction = AmountReduction;
