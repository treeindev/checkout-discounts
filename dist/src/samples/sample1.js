"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("../app");
/**
 * This is a sample execution of the system.
 * It creates a new application instance and executes few commands.
 */
var checkout = new app_1.CheckoutApp();
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
    "2021-PROMOTION",
    "2020-SALES"
]);
// Final to return the result of the execution.
checkout.result();
