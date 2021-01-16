import { Checkout } from "../interfaces/checkout";
import { Product } from "../interfaces/products";
import { Rule } from "../interfaces/rules";
import { AmountReduction } from "../rules/amount-reduction";
import { FreeProduct } from "../rules/free-product";
import { PercentageReduction } from "../rules/percentage-reduction";

export class CheckoutService {
    private available_rules: any;

    constructor() {
        this.available_rules = {
            amount_reduction: new AmountReduction(),
            percentage_reduction: new PercentageReduction(),
            free_product: new FreeProduct()
        }
    }

    /**
     * Applies given set of rules to a given products.
     * The checkout state is calculated per each rule and returned.
     */
    public applyRules(products:Array<Product>, rules:Array<Rule>): Checkout {
        /*if (!rules || rules.length === 0) {
            throw("Invalid rules provided, please review and try again.");
        }*/

        // The initial checkout state has the full cost of the products.
        // The discount is going to be applied by each given rule.
        let checkout: Checkout = {
            cost: this.calculateCost(products, 0),
            discount: 0,
            products: products,
            messages: [],
            getTotal: function() {
                const cost = this.cost - this.discount;
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

        checkout.cost = this.calculateCost(checkout.products, checkout.discount)
        
        return checkout;
    }

    /**
     * Calculates the cost amount of a given products.
     */
    private calculateCost(products:Array<Product>, discount: number): number {
        return products.reduce((accumulator, product) => accumulator + product.price, 0)
    }
}