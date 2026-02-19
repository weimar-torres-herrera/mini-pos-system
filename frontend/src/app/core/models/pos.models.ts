export interface Product {
    id: string;
    name: string;
    price: number;
    stock: number;
}

export interface CartItem {
    id: string;
    productId: string;
    productName?: string;
    price?: number;
    quantity: number;
}

export interface Sale {
    id: string;
    total: number;
    createdAt: Date;
    items: SaleItem[];
}

export interface SaleItem {
    productId: string;
    quantity: number;
    priceAtSale: number;
}
