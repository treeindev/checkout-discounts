"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckoutService = void 0;
var amount_reduction_1 = require("../rules/amount-reduction");
var cost_reduction_1 = require("../rules/cost-reduction");
var free_product_1 = require("../rules/free-product");
var percentage_reduction_1 = require("../rules/percentage-reduction");
var CheckoutService = /** @class */ (function () {
    function CheckoutService() {
        this.available_rules = {
            amount_reduction: new amount_reduction_1.AmountReduction(),
            percentage_reduction: new percentage_reduction_1.PercentageReduction(),
            free_product: new free_product_1.FreeProduct(),
            cost_reduction: new cost_reduction_1.CostReduction()
        };
    }
    /**
     * Applies given set of rules to a given products.
     * The checkout state is calculated per each rule and returned.
     */
    CheckoutService.prototype.applyRules = function (products, rules) {
        var _this = this;
        // The initial checkout state has the full cost of the products.
        // The discount is going to be applied by each given rule.
        var checkout = {
            discount: 0,
            products: products,
            messages: [],
            getProductCost: function () {
                return this.products.reduce(function (accumulator, product) { return accumulator + product.price; }, 0);
            },
            getTotal: function () {
                var cost = this.getProductCost() - this.discount;
                // Final cost with discount should never go bellow 0.
                cost = cost > 0 ? cost : 0;
                // The following formula is used to ensure values like 1.005 round correctly.
                return Math.round((cost + Number.EPSILON) * 100) / 100;
            }
        };
        rules.map(function (rule) {
            if (!_this.available_rules[rule.type]) {
                throw ("Invalid rule type: " + rule.type);
            }
            checkout = _this.available_rules[rule.type].execute(checkout, rule);
        });
        return checkout;
    };
    return CheckoutService;
}());
exports.CheckoutService = CheckoutService;
