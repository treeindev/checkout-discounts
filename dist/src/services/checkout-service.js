"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckoutService = void 0;
var CheckoutService = /** @class */ (function () {
    function CheckoutService(rules) {
        this.ruleService = rules;
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
            var executer = _this.ruleService.getRuleExecutor(rule.type);
            checkout = executer.execute(checkout, rule);
        });
        return checkout;
    };
    return CheckoutService;
}());
exports.CheckoutService = CheckoutService;
