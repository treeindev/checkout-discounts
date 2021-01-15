"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("../app");
var app = new app_1.CheckoutApp();
app.add(2, "shirt", "Red Collection", 3.99);
app.scan(1);
app.scan(3);
app.result();
