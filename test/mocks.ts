export const CONSTANTS = {
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
}

export const CASES = [
    {
        name: "Should validate a basic discount rule",
        product_ids: [1,2,3],
        rule_codes: ["2021-PROMOTION"],
        expected: 14.01
    },
    {
        name: "Should validate a no rule checkout",
        product_ids: [4,5],
        rule_codes: [],
        expected: 34.39
    },
    {
        name: "Should checkout a single product",
        product_ids: [6],
        rule_codes: [],
        expected: 12.54
    }
]