import { CheckoutApp } from "../app";

/**
 * This is a sample execution of the system.
 * It creates a new application instance and executes few commands.
 */
const checkout = new CheckoutApp();

// Addition of a new product to the system.
// The database sample has products up to ID 6.
checkout.add(7, "shirt", "Red Collection", 3.99);

// Scanning a products is done by passing a product ID.
// A product can be scanned multiple times.
checkout.scan(1);
checkout.scan(3);
checkout.scan(7);

// Addition of discount rules to the checkout.
// Multiple rules can be added simultaneously.
checkout.setRules([
    "2021-PROMOTION"
]);

// Final to return the result of the execution.
checkout.result();