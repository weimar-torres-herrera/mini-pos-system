import { Injectable, OnModuleInit, Inject } from '@nestjs/common';
import { IProductRepository } from '../../domain/repositories/product.repository.interface';
import { Product } from '../../domain/entities/product.entity';

@Injectable()
export class DatabaseSeeder implements OnModuleInit {
    constructor(
        @Inject('IProductRepository')
        private readonly productRepository: IProductRepository,
    ) { }

    async onModuleInit() {
        const products = await this.productRepository.findAll();
        if (products.length === 0) {
            console.log('Seeding database...');
            await this.productRepository.save(new Product('1561f008-662f-4131-a20c-03d1624b5952', 'Laptop Gaming', 1200, 10));
            await this.productRepository.save(new Product('7361f008-662f-4131-a20c-03d1624b5953', 'Mouse Inalámbrico', 25, 50));
            await this.productRepository.save(new Product('8361f008-662f-4131-a20c-03d1624b5954', 'Teclado Mecánico', 75, 20));
            await this.productRepository.save(new Product('9361f008-662f-4131-a20c-03d1624b5955', 'Monitor 4K', 350, 5));
            console.log('Seeding complete.');
        }
    }
}
