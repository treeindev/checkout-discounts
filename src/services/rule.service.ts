import { Rule, RuleDatabasePort, RuleServiceModel } from "../interfaces/rules";
import { AmountReduction } from "../rules/amount-reduction";
import { CostReduction } from "../rules/cost-reduction";
import { FreeProduct } from "../rules/free-product";
import { PercentageReduction } from "../rules/percentage-reduction";

/**
 * This service handles the logic related to rules.
 * The service does not concern where data is fetched from.
 * It uses interfaces to specify the required methods to fetch data.
 */
export class RuleService implements RuleServiceModel {
    private database: RuleDatabasePort;
    private rule_executer: any = {
        amount_reduction: new AmountReduction(),
        percentage_reduction: new PercentageReduction(),
        free_product: new FreeProduct(),
        cost_reduction: new CostReduction()
    }

    constructor(adapter: RuleDatabasePort) {
        this.database = adapter;
    }

    /**
     * Gets a rule from a given code.
     * The rule code should match one or error will be thrown.
     */
    public getByCode(code: string): Rule {
        const rule = this.database.getRuleByCode(code);
        if (!rule) {
            throw `Error: Given rule code:(${code}) does not match any rules on the system.`;
        }
        return rule;
    }

    /**
     * Returns a rule executer instance.
     */
    public getRuleExecutor(type: string): any {
        if (!this.rule_executer[type]) {
            throw (`Invalid rule type: ${type}. You must provide a valid rule type.`);
        }
        return this.rule_executer[type];
    }
}