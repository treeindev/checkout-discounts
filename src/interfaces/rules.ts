import { Checkout } from "./checkout";
import { Product } from "./products";

export interface Rule {
    code: string;
    type: string;
    values: any;
}

export interface RuleExecuter {
    execute(checkout: Checkout, products: Array<Product>, rule: any): Checkout;
}

export interface RuleDatabaseAdapter {
    getRuleByCode: Function;
    addRule: Function;
}