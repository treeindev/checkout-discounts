import { CheckoutApp } from '../src/app';
import { expect } from 'chai';
import 'mocha';

/**
 * The constats that can be reused across the testing script.
 */
const CONSTANTS = {
    PRODUCT_NEW: {
        ID: 999,
        TYPE: "test",
        NAME: "testing product",
        PRICE: 3.55
    },
    PRODUCT_EXISTING: {
        ID: 1
    },
}

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
    });