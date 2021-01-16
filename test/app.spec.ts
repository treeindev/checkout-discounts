import { CheckoutApp } from '../src/app';
import { expect } from 'chai';
import { CONSTANTS } from './mocks';
import 'mocha';

/**
 * Here we are testing the functionality of the application as a single unit.
 */
describe('Testing that application can be created and executed',
    () => {
        it('should allow to create application', () => {
            const app = new CheckoutApp();
            expect(app).to.be.an.instanceof(CheckoutApp);
            expect(app).to.have.property("products");
            expect(app).to.have.property("productService");
            expect(app).to.have.property("rules");
            expect(app).to.have.property("ruleService");
            expect(app).to.have.property("checkoutService");
            expect(app).to.have.property("result");
        });
        it('should allow to add a new product', () => {
            const app = new CheckoutApp();
            app.add(
                CONSTANTS.PRODUCT_NEW.ID,
                CONSTANTS.PRODUCT_NEW.TYPE,
                CONSTANTS.PRODUCT_NEW.NAME,
                CONSTANTS.PRODUCT_NEW.PRICE
            );
            app.scan(CONSTANTS.PRODUCT_NEW.ID);
            expect(
                app.products.find(product => product.id === CONSTANTS.PRODUCT_NEW.ID)
            ).to.be.an.instanceof(Object);
        });
        it('should allow to scan an existing product', () => {
            const app = new CheckoutApp();
            expect(
                app.scan(CONSTANTS.PRODUCT_EXISTING.ID)
            ).to.be.true;
        });
        it('should show ERROR when a non existing product is scanned', () => {
            const app = new CheckoutApp();
            expect(
                app.scan(CONSTANTS.PRODUCT_NEW.ID)
            ).to.be.false;
        });
        it('should allow to apply a discount rule', () => {
            const app = new CheckoutApp();
            expect(
                app.setRules([CONSTANTS.RULE_EXISTING.CODE])
            ).to.be.true;
        });
        it('should show ERROR when applying a non existing discount rule', () => {
            const app = new CheckoutApp();
            expect(
                app.setRules([CONSTANTS.RULE_NEW.CODE])
            ).to.be.false;
        });
        it('should allow to scan and checkout a set of products', () => {
            const app = new CheckoutApp();
            app.scan(CONSTANTS.PRODUCT_EXISTING.ID);
            app.setRules([CONSTANTS.RULE_EXISTING.CODE]);
            const result = app.result();
            expect(result).not.to.be.undefined;
        });
        it('should show ERROR when checking out an invalid discount rule', () => {
            const app = new CheckoutApp();
            expect(app.setRules([CONSTANTS.RULE_NEW.CODE]));
            const result = app.result();
            expect(result).to.be.equal(0);
        });
    });