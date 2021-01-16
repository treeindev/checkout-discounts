import { Checkout } from "../interfaces/checkout";
import { Product } from "../interfaces/products";
import { Rule, RuleExecuter } from "../interfaces/rules";

export class PercentageReduction implements RuleExecuter {
    /**
     * Executes a percentage reduction discount.
     */
    public execute(checkout: Checkout, products: Array<Product>, rule: Rule): Checkout {
        // The provided rule must have a valid format.
        if (!rule.values.hasOwnProperty("minimum_cost") || !rule.values.hasOwnProperty("discount_value")) {
            throw(`The ${rule.code} rule has invalid values, please review them and try again.`);
        }
        
        // In order to apply this discount rule,
        // the total cost must be higher than the defined minimum. 
        if (checkout.cost < rule.values.minimum_cost) {
            return checkout;
        }

        checkout.cost = checkout.cost - checkout.cost * rule.values.discount_value / 100;
        checkout.messages.push(`You are getting a ${rule.values.discount_value}% discount!`);
        return checkout;
    }
}