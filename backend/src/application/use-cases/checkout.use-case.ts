import { Inject, Injectable } from '@nestjs/common';
import { IProductRepository } from '../../domain/repositories/product.repository.interface';
import { ICartRepository } from '../../domain/repositories/cart.repository.interface';
import { ISaleRepository } from '../../domain/repositories/sale.repository.interface';
import { InsufficientStockException } from '../../domain/exceptions/domain.exceptions';
import { Sale, SaleItem } from '../../domain/entities/sale.entity';

@Injectable()
export class CheckoutUseCase {
    constructor(
        @Inject('IProductRepository')
        private readonly productRepository: IProductRepository,
        @Inject('ICartRepository')
        private readonly cartRepository: ICartRepository,
        @Inject('ISaleRepository')
        private readonly saleRepository: ISaleRepository,
    ) { }

    async execute(): Promise<Sale> {
        const cartItems = await this.cartRepository.getItems();
        if (cartItems.length === 0) {
            throw new Error('Cart is empty');
        }

        const saleItems: SaleItem[] = [];
        let total = 0;

        // Process each item
        for (const item of cartItems) {
            const product = await this.productRepository.findById(item.productId);
            if (!product) throw new Error(`Product not found: ${item.productId}`);

            const affected = await this.productRepository.decrementStock(item.productId, item.quantity);
            if (affected === 0) {
                throw new InsufficientStockException(product.name);
            }

            total += product.price * item.quantity;
            saleItems.push(new SaleItem('', '', product.id, item.quantity, product.price));
        }

        const sale = new Sale('', total, new Date(), saleItems);
        const savedSale = await this.saleRepository.save(sale);

        await this.cartRepository.clear();
        return savedSale;
    }
}
