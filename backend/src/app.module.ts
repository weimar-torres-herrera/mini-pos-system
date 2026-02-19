import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PosModule } from './presentation/pos.module';
import { ProductOrmEntity } from './infrastructure/persistence/typeorm/product.orm-entity';
import { CartItemOrmEntity } from './infrastructure/persistence/typeorm/cart-item.orm-entity';
import { SaleOrmEntity, SaleItemOrmEntity } from './infrastructure/persistence/typeorm/sale.orm-entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST || 'localhost',
      port: Number(process.env.DATABASE_PORT) || 5432,
      username: process.env.DATABASE_USER || 'postgres',
      password: process.env.DATABASE_PASSWORD || 'weimar',
      database: process.env.DATABASE_NAME || 'postgres',
      entities: [ProductOrmEntity, CartItemOrmEntity, SaleOrmEntity, SaleItemOrmEntity],
      synchronize: true,
    }),
    PosModule,
  ],
})
export class AppModule { }
