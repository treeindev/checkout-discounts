"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CASES = exports.CONSTANTS = void 0;
exports.CONSTANTS = {
    PRODUCT_NEW: {
        ID: 999,
        TYPE: "test",
        NAME: "testing product",
        PRICE: 3.55
    },
    PRODUCT_EXISTING: {
        ID: 1
    },
    RULE_NEW: {
        CODE: "TEST-CASE"
    },
    RULE_EXISTING: {
        CODE: "BLACK-FRIDAY"
    }
};
exports.CASES = [
    {
        name: "Should validate a basic discount rule",
        product_ids: [1, 2, 3],
        rule_codes: ["2021-PROMOTION"],
        expected: 14.01
    },
    {
        name: "Should validate a no rule checkout",
        product_ids: [4, 5],
        rule_codes: [],
        expected: 34.39
    },
    {
        name: "Should checkout a single product",
        product_ids: [6],
        rule_codes: [],
        expected: 12.54
    },
    {
        name: "Should checkout an amount reduction rule with minimum value",
        product_ids: [1, 2, 3],
        rule_codes: ["2020-SALES"],
        expected: 10
    },
    {
        name: "Should checkout a percentage reduction rule",
        product_ids: [4, 6],
        rule_codes: ["BLACK-FRIDAY"],
        expected: 20.74
    },
    {
        name: "Should checkout a cost reduction rule",
        product_ids: [5, 6],
        rule_codes: ["OPPORTUNITY"],
        expected: 10
    },
    {
        name: "Should checkout with free product rule",
        product_ids: [1, 2, 3],
        rule_codes: ["2021-EUROPE"],
        expected: 15
    },
    {
        name: "Should checkout correctly with multiple discount rules",
        product_ids: [4, 5, 4, 6],
        rule_codes: ["OPPORTUNITY", "BLACK-FRIDAY"],
        expected: 18
    },
    {
        name: "Should checkout correctly with lots of product combinations",
        product_ids: [4, 5, 4, 6, 5, 5, 4, 4, 5, 6, 4, 4, 6, 5, 5, 6, 5, 5, 4, 5, 5, 1, 2, 1, 2],
        rule_codes: ["OPPORTUNITY"],
        expected: 125
    },
    {
        name: "Should checkout correctly with lots of product and rule combinations",
        product_ids: [4, 5, 4, 6, 5, 5, 4, 4, 5, 6, 4, 4, 6, 5, 5, 6, 5, 5, 4, 5, 5, 1, 2, 1, 2],
        rule_codes: ["OPPORTUNITY", "2021-EUROPE", "BLACK-FRIDAY"],
        expected: 112.5
    },
    {
        name: "Should checkout with predefined test case",
        product_ids: [4, 5, 4, 1],
        rule_codes: ["OPPORTUNITY", "BLACK-FRIDAY"],
        expected: 17.99
    },
    {
        name: "Should checkout correctly with no products",
        product_ids: [],
        rule_codes: [],
        expected: 0
    },
    {
        name: "Should checkout cwith minimum price of 0, never return negative numbers",
        product_ids: [],
        rule_codes: ["2021-PROMOTION"],
        expected: 0
    }
];
