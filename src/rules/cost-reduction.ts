import { Checkout } from "../interfaces/checkout";
import { Rule } from "../interfaces/rules";
import { RuleExecutor } from "../interfaces/rules";

export class CostReduction implements RuleExecutor {
    /**
     * Executes a cost reduction discount.
     */
    public execute(checkout: Checkout, rule: Rule): Checkout {
        // The provided rule must have a valid format.
        if (!rule.values.hasOwnProperty("type") || 
            !rule.values.hasOwnProperty("minimum_items") || 
            !rule.values.hasOwnProperty("new_cost")) {
            throw(`The ${rule.code} rule has invalid values, please review them and try again.`);
        }

        // Purchase object used to store object-number relation
        const purchase: any = {}
        checkout.products.map(product => {
            if (purchase.hasOwnProperty(product.type) ) {
                purchase[product.type]++;
                return;
            }
            purchase[product.type] = 1;
        })
        
        // In order to apply this promotion rule,
        // the total number of same item type has to be higher than the defined one.
        for (const [type, number] of Object.entries(purchase)) {
            // @ts-ignore
            if (number >= rule.values.minimum_items) {
                checkout.products = checkout.products.map(product => {
                    if (product.type !== type) {return product;}
                    product.price = rule.values.new_cost;
                    return product;
                })
                checkout.messages.push(`New price for ${type}, all items for: ${rule.values.new_cost}€!`);
            }
        }
        return checkout;
    }
}