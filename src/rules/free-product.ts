import { Checkout } from "../interfaces/checkout";
import { Product } from "../interfaces/products";
import { Rule, RuleExecutor } from "../interfaces/rules";

export class FreeProduct implements RuleExecutor {
    /**
     * Executes a free product promotion.
     */
    public execute(checkout: Checkout, rule: Rule): Checkout {
        // The provided rule must have a valid format.
        if (!rule.values.hasOwnProperty("type") || 
            !rule.values.hasOwnProperty("minimum_items") || 
            !rule.values.hasOwnProperty("free_units")) {
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
                checkout.messages.push(`You are getting ${rule.values.free_units} ${type} for free!`);
                
                // Add new product to the checkout collection.
                // New product is a clone from an existing product type.
                const newProduct: any = {...checkout.products.find(product => product.type === type)};
                newProduct.price = 0;
                checkout.products.push(newProduct);
            }
        }

        // This discount rule does not change the cost of the checkout,
        // It gives a free product message instead.
        return checkout;
    }
}
