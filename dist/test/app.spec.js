"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("../src/app");
var chai_1 = require("chai");
var mocks_1 = require("./mocks");
require("mocha");
/**
 * Here we are testing the functionality of the application as a single unit.
 */
describe('Testing that application can be created and executed', function () {
    it('should allow to create application', function () {
        var app = new app_1.CheckoutApp();
        chai_1.expect(app).to.be.an.instanceof(app_1.CheckoutApp);
        chai_1.expect(app).to.have.property("products");
        chai_1.expect(app).to.have.property("productService");
        chai_1.expect(app).to.have.property("rules");
        chai_1.expect(app).to.have.property("ruleService");
        chai_1.expect(app).to.have.property("checkoutService");
        chai_1.expect(app).to.have.property("result");
    });
    it('should allow to add a new product', function () {
        var app = new app_1.CheckoutApp();
        app.add(mocks_1.CONSTANTS.PRODUCT_NEW.ID, mocks_1.CONSTANTS.PRODUCT_NEW.TYPE, mocks_1.CONSTANTS.PRODUCT_NEW.NAME, mocks_1.CONSTANTS.PRODUCT_NEW.PRICE);
        app.scan(mocks_1.CONSTANTS.PRODUCT_NEW.ID);
        chai_1.expect(app.products.find(function (product) { return product.id === mocks_1.CONSTANTS.PRODUCT_NEW.ID; })).to.be.an.instanceof(Object);
    });
    it('should show ERROR when adding a new product with existing ID', function () {
        var app = new app_1.CheckoutApp();
        var result = app.add(mocks_1.CONSTANTS.PRODUCT_EXISTING.ID, mocks_1.CONSTANTS.PRODUCT_NEW.TYPE, mocks_1.CONSTANTS.PRODUCT_NEW.NAME, mocks_1.CONSTANTS.PRODUCT_NEW.PRICE);
        chai_1.expect(result).to.be.false;
    });
    it('should allow to scan an existing product', function () {
        var app = new app_1.CheckoutApp();
        chai_1.expect(app.scan(mocks_1.CONSTANTS.PRODUCT_EXISTING.ID)).to.be.true;
    });
    it('should show ERROR when a non existing product is scanned', function () {
        var app = new app_1.CheckoutApp();
        chai_1.expect(app.scan(mocks_1.CONSTANTS.PRODUCT_NEW.ID)).to.be.false;
    });
    it('should allow to apply a discount rule', function () {
        var app = new app_1.CheckoutApp();
        chai_1.expect(app.setRules([mocks_1.CONSTANTS.RULE_EXISTING.CODE])).to.be.true;
    });
    it('should show ERROR when applying a non existing discount rule', function () {
        var app = new app_1.CheckoutApp();
        chai_1.expect(app.setRules([mocks_1.CONSTANTS.RULE_NEW.CODE])).to.be.false;
    });
    it('should allow to scan and checkout a set of products', function () {
        var app = new app_1.CheckoutApp();
        app.scan(mocks_1.CONSTANTS.PRODUCT_EXISTING.ID);
        app.setRules([mocks_1.CONSTANTS.RULE_EXISTING.CODE]);
        var result = app.result();
        chai_1.expect(result).not.to.be.undefined;
    });
    it('should show ERROR when checking out an invalid discount rule', function () {
        var app = new app_1.CheckoutApp();
        chai_1.expect(app.setRules([mocks_1.CONSTANTS.RULE_NEW.CODE]));
        var result = app.result();
        chai_1.expect(result).to.be.equal(0);
    });
});
