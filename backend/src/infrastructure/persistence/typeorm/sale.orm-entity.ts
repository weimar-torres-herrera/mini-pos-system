import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, ManyToOne } from 'typeorm';

@Entity('sales')
export class SaleOrmEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('decimal', { precision: 10, scale: 2 })
    total: number;

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(() => SaleItemOrmEntity, (item) => item.sale, { cascade: true })
    items: SaleItemOrmEntity[];
}

@Entity('sale_items')
export class SaleItemOrmEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('uuid')
    productId: string;

    @Column('int')
    quantity: number;

    @Column('decimal', { precision: 10, scale: 2 })
    priceAtSale: number;

    @ManyToOne(() => SaleOrmEntity, (sale) => sale.items)
    sale: SaleOrmEntity;
}
