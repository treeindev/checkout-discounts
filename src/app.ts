import { Product } from "./interfaces/products";
import { ProductService } from "./services/product.service";
import { ProductPort } from "./database/product-port";

export class CheckoutApp {
    public products: Array<Product> = []
    private productService = new ProductService(new ProductPort());

    /**
     * Method used to add a new product to the system.
     */
    public add(id: number, type: string, name: string, price: number) {
        try {
            this.productService.addProduct(id, type, name, price);
        } catch(e) { console.error(e); }
    }

    /**
     * Method to scan a product and add it to the internal checkout collection.
     * The provided ID must exist or application will return error.
     */
    public scan(productId: number): boolean {
        try {
            this.products.push(
                this.productService.getById(productId)
            );
            return true;
        } catch(e) { 
            console.error(e);
            return false;
        }
    }

    public result() {
        console.log(this.products)
    }
}