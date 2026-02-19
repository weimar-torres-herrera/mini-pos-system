import { Product } from '../entities/product.entity';

export interface IProductRepository {
    findAll(): Promise<Product[]>;
    findById(id: string): Promise<Product | null>;
    decrementStock(productId: string, quantity: number): Promise<number>;
    save(product: Product): Promise<void>;
}
