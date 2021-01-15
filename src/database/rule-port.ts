import { RuleDatabaseAdapter, Rule } from "../interfaces/rules";
import { Database } from "./database";

/**
 * This is port that is used to connect to the inner layers of the system.
 * The Port exposes a set of methods that can be used to fetch data.
 * In a real project, this class would generate the string Queries to be passed to database.
 */
export class RulePort implements RuleDatabaseAdapter {
    private database = new Database();

    /**
     * Retrieves a rule based on a given code.
     */
    public getRuleByCode(code: string) {
        return this.database.rules.find(rule => rule.code === code);
    }

    /**
     * Adds a new rule to the database.
     * The provided rule code must be unique.
     */
    public addRule(rule: Rule) {
        if (this.database.rules.find(rule => rule.code === rule.code)) {
            throw `Error: Given rule code:(${rule.code}) already exists on the system.`;
        }
        this.database.rules.push(rule);
    }
}