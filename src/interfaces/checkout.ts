import { Product } from "./products";

export interface Checkout {
    discount: number;
    products: Array<Product>;
    messages: Array<string>;
    getProductCost(): number;
    getTotal(): number;
}