import { Checkout } from "../interfaces/checkout";
import { Product } from "../interfaces/products";
import { Rule } from "../interfaces/rules";
import { AmountReduction } from "../rules/amount-reduction";
import { CostReduction } from "../rules/cost-reduction";
import { FreeProduct } from "../rules/free-product";
import { PercentageReduction } from "../rules/percentage-reduction";

export class CheckoutService {
    private available_rules: any;

    constructor() {
        this.available_rules = {
            amount_reduction: new AmountReduction(),
            percentage_reduction: new PercentageReduction(),
            free_product: new FreeProduct(),
            cost_reduction: new CostReduction()
        }
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
            if (!this.available_rules[rule.type]) {
                throw (`Invalid rule type: ${rule.type}`);
            }
            checkout = this.available_rules[rule.type].execute(checkout, rule);
        });
        
        return checkout;
    }
}