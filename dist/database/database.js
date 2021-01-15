"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
var Database = /** @class */ (function () {
    function Database() {
        this.products = [
            {
                id: 1,
                type: "Pizza",
                price: 4.99,
                name: "Pizza Cheese"
            },
            {
                id: 2,
                type: "Pizza",
                price: 5.01,
                name: "Pizza Marganita"
            }
        ];
    }
    return Database;
}());
exports.Database = Database;
