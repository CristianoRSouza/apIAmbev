import { CartProduct } from "./cart-product.interface";

export interface CartCreate {
    userId: number;
    date: Date;
    products: CartProduct[];
}

export interface Cart {
    id: string;
    userId: number;
    date: Date;
    products: CartProduct[];
}