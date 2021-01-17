import { Rule, RuleDatabasePort } from "../interfaces/rules";

/**
 * This service handles the logic related to rules.
 * The service does not concern where data is fetched from.
 * It uses interfaces to specify the required methods to fetch data.
 */
export class RuleService {
    private database: RuleDatabasePort;

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
}