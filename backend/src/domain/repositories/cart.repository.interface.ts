import { CartItem } from '../entities/cart-item.entity';

export interface ICartRepository {
    getItems(): Promise<CartItem[]>;
    addItem(productId: string, quantity: number): Promise<void>;
    updateItem(productId: string, quantity: number): Promise<void>;
    removeItem(productId: string): Promise<void>;
    clear(): Promise<void>;
}
