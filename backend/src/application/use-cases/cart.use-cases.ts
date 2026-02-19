import { Inject, Injectable } from '@nestjs/common';
import { ICartRepository } from '../../domain/repositories/cart.repository.interface';
import { CartItem } from '../../domain/entities/cart-item.entity';

@Injectable()
export class CartUseCases {
    constructor(
        @Inject('ICartRepository')
        private readonly cartRepository: ICartRepository,
    ) { }

    async getCartItems(): Promise<CartItem[]> {
        return this.cartRepository.getItems();
    }

    async addItemToCart(productId: string, quantity: number): Promise<void> {
        await this.cartRepository.addItem(productId, quantity);
    }

    async removeItemFromCart(productId: string): Promise<void> {
        await this.cartRepository.removeItem(productId);
    }
}
