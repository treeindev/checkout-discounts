import { CheckoutApp } from "../app";

/**
 * This is a sample execution of the system.
 * It creates a new application instance and executes few commands.
 */
const app = new CheckoutApp();

// Addition of a new product.
app.add(3, "shirt", "Red Collection", 3.99);

// Scanning of two products is done via product ID.
app.scan(1);
app.scan(3)

// Final to return the result of the execution.
app.result();