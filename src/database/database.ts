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
        }
    ]
}