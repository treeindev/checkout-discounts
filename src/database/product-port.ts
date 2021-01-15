import { ProductDatabaseAdapter } from "../interfaces/products";
import { Database } from "./database";

/**
 * This is port that is used to connect to the inner layers of the system.
 * The Port exposes a set of methods that can be used to fetch data.
 * In a real project, this class would generate the string Queries to be passed to database.
 */
export class ProductPort implements ProductDatabaseAdapter {
    private database = new Database();

    /**
     * Retrieves a product based on a given id.
     */
    public getProductById(id: number) {
        return this.database.products.find(
            product => product.id === id
        );
    }

    /**
     * Adds a new product to the database.
     * The provided product ID must be unique.
     */
    public addProduct(product: any) {
        if (this.database.products.find(p => p.id === product.id)) {
            throw `Error: Given product ID:(${product.id}) already exists on the system.`;
        }
        this.database.products.push(product);
    }
}