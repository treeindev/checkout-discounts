"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RuleAdapter = void 0;
var database_1 = require("./database");
/**
 * This is port that is used to connect to the inner layers of the system.
 * The Port exposes a set of methods that can be used to fetch data.
 * In a real project, this class would generate the string Queries to be passed to database class.
 */
var RuleAdapter = /** @class */ (function () {
    function RuleAdapter() {
        this.database = new database_1.Database();
    }
    /**
     * Retrieves a rule based on a given code.
     */
    RuleAdapter.prototype.getRuleByCode = function (code) {
        return this.database.rules.find(function (rule) { return rule.code === code; });
    };
    /**
     * Adds a new rule to the database.
     * The provided rule code must be unique.
     */
    RuleAdapter.prototype.addRule = function (rule) {
        if (this.database.rules.find(function (rule) { return rule.code === rule.code; })) {
            throw "Error: Given rule code:(" + rule.code + ") already exists on the system.";
        }
        this.database.rules.push(rule);
    };
    return RuleAdapter;
}());
exports.RuleAdapter = RuleAdapter;
