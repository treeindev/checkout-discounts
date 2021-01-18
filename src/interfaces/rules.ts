import { Checkout } from "./checkout";
import { Product } from "./products";

export interface Rule {
    code: string;
    type: string;
    values: any;
}

export interface RuleExecutor {
    execute(checkout: Checkout, rule: any): Checkout;
}

export interface RuleDatabasePort {
    getRuleByCode(code: string): any;
    addRule(rule: Rule): void;
}

// This interface maps the current model of the RuleService class
// It will be used for anyone accessing it via dependency injection.
export interface RuleServiceModel {
    getByCode(code: string): Rule;
    getRuleExecutor(type: string): any
}