import { CheckoutApp } from '../src/app';
import { expect } from 'chai';
import { CASES } from './mocks';
import 'mocha';

/**
 * Here we are testing the functionality of the application as a single unit.
 */
describe('Testing that multiple checkout cases match the expected output',
    () => {
        CASES.map((props:any) => {
            it(props.name, () => {
                // Create new checkout instance.
                const app = new CheckoutApp();
                
                // Scan multiple products.
                props.product_ids.map((id: number) => {
                    app.scan(id);
                });

                // Apply multiple rules.
                app.setRules(props.rule_codes);

                // Assert the final result.
                const result = app.result();
                expect(result).to.be.equal(props.expected);
            });
        });
    });