export interface Product {
    id: number;
    type: string;
    name: string;
    price: number;
}

export interface ProductDatabasePort {
    getProductById(id: number): any;
    addProduct(product: Product): void;
}