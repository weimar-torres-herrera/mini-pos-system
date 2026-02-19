import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ISaleRepository } from '../../../domain/repositories/sale.repository.interface';
import { Sale, SaleItem } from '../../../domain/entities/sale.entity';
import { SaleOrmEntity, SaleItemOrmEntity } from './sale.orm-entity';

@Injectable()
export class TypeOrmSaleRepository implements ISaleRepository {
    constructor(
        @InjectRepository(SaleOrmEntity)
        private readonly saleOrmRepository: Repository<SaleOrmEntity>,
    ) { }

    async save(sale: Sale): Promise<Sale> {
        const ormSale = new SaleOrmEntity();
        ormSale.total = sale.total;
        ormSale.items = sale.items.map(item => {
            const ormItem = new SaleItemOrmEntity();
            ormItem.productId = item.productId;
            ormItem.quantity = item.quantity;
            ormItem.priceAtSale = item.priceAtSale;
            return ormItem;
        });

        const savedSale = await this.saleOrmRepository.save(ormSale);

        return new Sale(
            savedSale.id,
            Number(savedSale.total),
            savedSale.createdAt,
            savedSale.items.map(i => new SaleItem(i.id, savedSale.id, i.productId, i.quantity, Number(i.priceAtSale)))
        );
    }

    async findById(id: string): Promise<Sale | null> {
        const s = await this.saleOrmRepository.findOne({
            where: { id },
            relations: ['items']
        });
        if (!s) return null;
        return new Sale(
            s.id,
            Number(s.total),
            s.createdAt,
            s.items.map(i => new SaleItem(i.id, s.id, i.productId, i.quantity, Number(i.priceAtSale)))
        );
    }
}
