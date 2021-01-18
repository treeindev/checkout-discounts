import { Checkout } from "../interfaces/checkout";
import { Product } from "../interfaces/products";
import { Rule, RuleServiceModel } from "../interfaces/rules";

export class CheckoutService {
    private ruleService: RuleServiceModel;

    constructor(rules: RuleServiceModel) {
        this.ruleService = rules;
    }

    /**
     * Applies given set of rules to a given products.
     * The checkout state is calculated per each rule and returned.
     */
    public applyRules(products:Array<Product>, rules:Array<Rule>): Checkout {
        // The initial checkout state has the full cost of the products.
        // The discount is going to be applied by each given rule.
        let checkout: Checkout = {
            discount: 0,
            products: products,
            messages: [],
            getProductCost: function() {
                return this.products.reduce((accumulator, product) => accumulator + product.price, 0)
            },
            getTotal: function() {
                let cost = this.getProductCost() - this.discount;
                // Final cost with discount should never go bellow 0.
                cost = cost > 0 ? cost : 0;
                // The following formula is used to ensure values like 1.005 round correctly.
                return Math.round((cost + Number.EPSILON) * 100) / 100;
            }
        };
        rules.map(rule => {
            const executer = this.ruleService.getRuleExecutor(rule.type);
            checkout = executer.execute(checkout, rule);
        });
        
        return checkout;
    }
}