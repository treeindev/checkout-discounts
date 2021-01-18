"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RuleService = void 0;
var amount_reduction_1 = require("../rules/amount-reduction");
var cost_reduction_1 = require("../rules/cost-reduction");
var free_product_1 = require("../rules/free-product");
var percentage_reduction_1 = require("../rules/percentage-reduction");
/**
 * This service handles the logic related to rules.
 * The service does not concern where data is fetched from.
 * It uses interfaces to specify the required methods to fetch data.
 */
var RuleService = /** @class */ (function () {
    function RuleService(adapter) {
        this.rule_executer = {
            amount_reduction: new amount_reduction_1.AmountReduction(),
            percentage_reduction: new percentage_reduction_1.PercentageReduction(),
            free_product: new free_product_1.FreeProduct(),
            cost_reduction: new cost_reduction_1.CostReduction()
        };
        this.database = adapter;
    }
    /**
     * Gets a rule from a given code.
     * The rule code should match one or error will be thrown.
     */
    RuleService.prototype.getByCode = function (code) {
        var rule = this.database.getRuleByCode(code);
        if (!rule) {
            throw "Error: Given rule code:(" + code + ") does not match any rules on the system.";
        }
        return rule;
    };
    /**
     * Returns a rule executer instance.
     */
    RuleService.prototype.getRuleExecutor = function (type) {
        if (!this.rule_executer[type]) {
            throw ("Invalid rule type: " + type + ". You must provide a valid rule type.");
        }
        return this.rule_executer[type];
    };
    return RuleService;
}());
exports.RuleService = RuleService;
