import { Product } from "./products";

export interface Checkout {
    discount: number;
    cost: number;
    products: Array<Product>;
    messages: Array<string>;
    getTotal(): number;
}