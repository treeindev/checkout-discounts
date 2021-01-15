export interface Product {
    id: number;
    type: string;
    name: string;
    price: number;
}

export interface ProductDatabaseAdapter {
    getProductById: Function;
    addProduct: Function;
}