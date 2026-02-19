import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ICartRepository } from '../../../domain/repositories/cart.repository.interface';
import { CartItem } from '../../../domain/entities/cart-item.entity';
import { CartItemOrmEntity } from './cart-item.orm-entity';

@Injectable()
export class TypeOrmCartRepository implements ICartRepository {
    constructor(
        @InjectRepository(CartItemOrmEntity)
        private readonly ormRepository: Repository<CartItemOrmEntity>,
    ) { }

    async getItems(): Promise<CartItem[]> {
        const items = await this.ormRepository.find();
        return items.map(i => new CartItem(i.id, i.productId, i.quantity));
    }

    async addItem(productId: string, quantity: number): Promise<void> {
        let item = await this.ormRepository.findOneBy({ productId });
        if (item) {
            item.quantity += quantity;
            await this.ormRepository.save(item);
        } else {
            await this.ormRepository.save({ productId, quantity });
        }
    }

    async updateItem(productId: string, quantity: number): Promise<void> {
        await this.ormRepository.update({ productId }, { quantity });
    }

    async removeItem(productId: string): Promise<void> {
        await this.ormRepository.delete({ productId });
    }

    async clear(): Promise<void> {
        await this.ormRepository.clear();
    }
}
