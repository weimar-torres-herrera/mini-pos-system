import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { CartUseCases } from '../../application/use-cases/cart.use-cases';

@Controller('cart')
export class CartController {
    constructor(private readonly cartUseCases: CartUseCases) { }

    @Get()
    async getCart() {
        return this.cartUseCases.getCartItems();
    }

    @Post('items')
    async addItem(@Body() body: { productId: string; quantity: number }) {
        return this.cartUseCases.addItemToCart(body.productId, body.quantity);
    }

    @Delete('items/:productId')
    async removeItem(@Param('productId') productId: string) {
        return this.cartUseCases.removeItemFromCart(productId);
    }
}
