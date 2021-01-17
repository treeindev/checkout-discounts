import { Checkout } from "./checkout";
import { Product } from "./products";

export interface Rule {
    code: string;
    type: string;
    values: any;
}

export interface RuleExecuter {
    execute(checkout: Checkout, rule: any): Checkout;
}

export interface RuleDatabasePort {
    getRuleByCode(code: string): any;
    addRule(rule: Rule): void;
}