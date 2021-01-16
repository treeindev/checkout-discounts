/**
 * This class represents the persistent layer of the system.
 * It acts as a Database and stores the default values on every execution.
 * In a real project this class would be in charge of stablishing DB connections like SQL.
 */
export class Database {
    public products = [
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
        },
        {
            id: 3,
            type: "Pizza",
            price: 5.01,
            name: "Deluxe Vegan" 
        },
        {
            id: 4,
            type: "Shirt",
            price: 10,
            name: "Blue stripes"
        },
        {
            id: 5,
            type: "Shirt",
            price: 10,
            name: "Red clean"
        },
        {
            id: 6,
            type: "Shirt",
            price: 10,
            name: "Yellow Shapes"
        },
    ];

    public rules = [
        {
            code: "2021-PROMOTION",
            type: "amount_reduction",
            values: {
                minimum_cost: 0,
                discount_value: 0.99
            }
        },
        {
            code: "2020-SALES",
            type: "amount_reduction",
            values: {
                minimum_cost: 10,
                discount_value: 5
            }
        },
        {
            code: "BLACK-FRIDAY",
            type: "percentage_reduction",
            values: {
                minimum_cost: 0,
                discount_value: 10
            }
        },
        {
            code: "2021-EUROPE",
            type: "free_product",
            values: {
                type: 'pizza',
                minimum_items: 3,
                free_units: 2
            }
        },
        {
            code: "OPPORTUNITY",
            type: "cost_reduction",
            values: {
                type: 'shirt',
                minimum_items: 2,
                new_cost: 5
            }
        }
    ]
}