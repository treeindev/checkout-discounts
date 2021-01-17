"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RuleService = void 0;
/**
 * This service handles the logic related to rules.
 * The service does not concern where data is fetched from.
 * It uses interfaces to specify the required methods to fetch data.
 */
var RuleService = /** @class */ (function () {
    function RuleService(adapter) {
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
    return RuleService;
}());
exports.RuleService = RuleService;
