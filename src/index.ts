import { CheckoutApp } from "./app";

/**
 * This is an execution example of the system.
 * It creates a new checkout instance and executes few commands.
 * You can modify this file to:
 *      - Add new products to the in-memory database.
 *      - Scan existing products from the database.
 *      - Apply existing discount rules from the database.
 */

// The checkout object is used to interact with the system.
const checkout = new CheckoutApp();

// Addition of a new product to the system.
// The database sample has products up to ID 6.
checkout.add(7, "shirt", "Red Collection", 3.99);

// Scanning a products is done by passing a product ID.
// A product can be scanned multiple times.
checkout.scan(1);
checkout.scan(2);
checkout.scan(3);
checkout.scan(7);

// Addition of discount rules to the checkout. Multiple rules can be added.
// It is important to note that rules are applied in the given order.
// Changing the order will change the final cost.
checkout.setRules([
    "2021-PROMOTION",
    "2020-SALES",
    "BLACK-FRIDAY",
    "2021-EUROPE"
]);

// Final to return the result of the execution.
checkout.result();