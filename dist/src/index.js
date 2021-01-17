"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./app");
/**
 * This is an execution example of the system.
 * It creates a new checkout instance and executes few commands.
 * You can modify this file to:
 *      - Add new products to the in-memory database.
 *      - Scan existing products from the database.
 *      - Apply existing discount rules from the database.
 */
// The checkout object is used to interact with the system.
var checkout = new app_1.CheckoutApp();
// Addition of a new product to the system.
// The database sample has products up to ID 6, so new ID must be higher.
checkout.add(7, "Shirt", "New Red Collection", 3.99);
// Scanning a products is done by passing a product ID.
// A product can be scanned multiple times.
checkout.scan(4);
checkout.scan(5);
checkout.scan(4);
checkout.scan(1);
// Addition of discount rules to the checkout. Multiple rules can be added.
// It is important to note that rules are applied in the given order.
// Changing the order will change the final cost.
checkout.setRules([
    "OPPORTUNITY",
    "BLACK-FRIDAY",
]);
// Final to return the result of the execution.
checkout.result();
