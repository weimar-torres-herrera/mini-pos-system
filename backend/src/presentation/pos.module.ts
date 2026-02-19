import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductOrmEntity } from '../infrastructure/persistence/typeorm/product.orm-entity';
import { CartItemOrmEntity } from '../infrastructure/persistence/typeorm/cart-item.orm-entity';
import { SaleOrmEntity, SaleItemOrmEntity } from '../infrastructure/persistence/typeorm/sale.orm-entity';
import { TypeOrmProductRepository } from '../infrastructure/persistence/typeorm/typeorm-product.repository';
import { TypeOrmCartRepository } from '../infrastructure/persistence/typeorm/typeorm-cart.repository';
import { TypeOrmSaleRepository } from '../infrastructure/persistence/typeorm/typeorm-sale.repository';
import { GetProductsUseCase } from '../application/use-cases/get-products.use-case';
import { CartUseCases } from '../application/use-cases/cart.use-cases';
import { CheckoutUseCase } from '../application/use-cases/checkout.use-case';
import { DatabaseSeeder } from '../infrastructure/persistence/seeder.service';
import { ProductController } from './controllers/product.controller';
import { CartController } from './controllers/cart.controller';
import { SaleController } from './controllers/sale.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ProductOrmEntity,
            CartItemOrmEntity,
            SaleOrmEntity,
            SaleItemOrmEntity,
        ]),
    ],
    controllers: [ProductController, CartController, SaleController],
    providers: [
        {
            provide: 'IProductRepository',
            useClass: TypeOrmProductRepository,
        },
        {
            provide: 'ICartRepository',
            useClass: TypeOrmCartRepository,
        },
        {
            provide: 'ISaleRepository',
            useClass: TypeOrmSaleRepository,
        },
        GetProductsUseCase,
        CartUseCases,
        CheckoutUseCase,
        DatabaseSeeder,
    ],
})
export class PosModule { }
