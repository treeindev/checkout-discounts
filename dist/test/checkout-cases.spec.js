"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("../src/app");
var chai_1 = require("chai");
var mocks_1 = require("./mocks");
require("mocha");
/**
 * Here we are testing the functionality of the application as a single unit.
 */
describe('Testing that multiple checkout cases match the expected output', function () {
    mocks_1.CASES.map(function (props) {
        it(props.name, function () {
            // Create new checkout instance.
            var app = new app_1.CheckoutApp();
            // Scan multiple products.
            props.product_ids.map(function (id) {
                app.scan(id);
            });
            // Apply multiple rules.
            app.setRules(props.rule_codes);
            // Assert the final result.
            var result = app.result();
            chai_1.expect(result).to.be.equal(props.expected);
        });
    });
});
