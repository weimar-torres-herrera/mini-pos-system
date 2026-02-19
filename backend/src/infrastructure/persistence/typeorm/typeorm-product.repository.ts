import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IProductRepository } from '../../../domain/repositories/product.repository.interface';
import { Product } from '../../../domain/entities/product.entity';
import { ProductOrmEntity } from './product.orm-entity';

@Injectable()
export class TypeOrmProductRepository implements IProductRepository {
    constructor(
        @InjectRepository(ProductOrmEntity)
        private readonly ormRepository: Repository<ProductOrmEntity>,
    ) { }

    async findAll(): Promise<Product[]> {
        const products = await this.ormRepository.find();
        return products.map(p => new Product(p.id, p.name, Number(p.price), p.stock));
    }

    async findById(id: string): Promise<Product | null> {
        const p = await this.ormRepository.findOneBy({ id });
        return p ? new Product(p.id, p.name, Number(p.price), p.stock) : null;
    }

    async decrementStock(productId: string, quantity: number): Promise<number> {
        const result = await this.ormRepository.createQueryBuilder()
            .update(ProductOrmEntity)
            .set({ stock: () => `stock - ${quantity}` })
            .where("id = :id AND stock >= :quantity", { id: productId, quantity })
            .execute();
        return result.affected || 0;
    }

    async save(product: Product): Promise<void> {
        await this.ormRepository.save({
            id: product.id,
            name: product.name,
            price: product.price,
            stock: product.stock,
        });
    }
}
