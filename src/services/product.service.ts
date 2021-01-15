import { Product, ProductDatabaseAdapter } from "../interfaces/products";

/**
 * This service handles the logic related to products.
 * The service does not concern where data is fetched from.
 * It uses interfaces to specify the required methods to fetch data.
 */
export class ProductService {
    private database: ProductDatabaseAdapter;

    constructor(database: ProductDatabaseAdapter) {
        this.database = database;
    }

    /**
     * Gets a product by a given ID.
     * An error if the provided ID does not exist.
     */
    public getById(id: number): Product {
        const product = this.database.getProductById(id);
        if (!product) {
            throw `Error: Given product ID:(${id}) does not match any product on the system.`;
        }
        return product;
    }

    /**
     * Adds a new product to the system.
     * The service handles the format validation of the data.
     */
    public addProduct(id: number, type: string, name: string, price: number): void {
        if (!id || !type || !name || !price) {
            throw `Provided product details are not valid.`;
        }
        const product: Product = {
            id: id,
            type: type,
            name: name,
            price: price
        }
        this.database.addProduct(product);
    }
}