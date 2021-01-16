import { Product } from "./interfaces/products";
import { ProductService } from "./services/product.service";
import { ProductPort } from "./database/product-port";
import { Rule } from "./interfaces/rules";
import { RuleService } from "./services/rule.service";
import { RulePort } from "./database/rule-port";
import { CheckoutService } from "./services/checkout-service";
import { Checkout } from "./interfaces/checkout";

export class CheckoutApp {
    public products: Array<Product> = [];
    public rules: Array<Rule> = [];
    private productService = new ProductService(new ProductPort());
    private ruleService = new RuleService(new RulePort());
    private checkoutService = new CheckoutService();

    /**
     * Method used to add a new product to the system.
     */
    public add(id: number, type: string, name: string, price: number) {
        try {
            this.productService.addProduct(id, type, name, price);
        } catch(e) { console.error(e); }
    }

    /**
     * Method to scan a product and add it to the internal checkout collection.
     * The provided ID must exist or application will return error.
     */
    public scan(productId: number): boolean {
        try {
            this.products.push(
                this.productService.getById(productId)
            );
            return true;
        } catch(e) { 
            console.error(e);
            return false;
        }
    }

    /**
     * Method to apply a collection of rules to the checkout system.
     * Rules won't be applied until the result method is called.
     */
    public setRules(collection: Array<string>): boolean {
        try {
            const rules = collection.map(
                rule => this.ruleService.getByCode(rule)
            );
            this.rules = [...this.rules, ...rules];
            return true;
        } catch(e) {
            console.error(e);
            return false;
        }
    }

    /**
     * Final step on the checkout process.
     * This method outputs the final cost of the current checkout execution.
     */
    public result() {
        // console.log(this.products, this.rules);
        try {
            const result = this.checkoutService.applyRules(this.products, this.rules);
            console.log(`The total checkout price is: ${result.getTotal()} €`);
            result.messages.map(message => console.log(message));
            return result.getTotal();
        } catch(e) {
            console.error(e);
            return false;
        }
    }
}