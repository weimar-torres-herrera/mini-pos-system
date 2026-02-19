import { Controller, Post } from '@nestjs/common';
import { CheckoutUseCase } from '../../application/use-cases/checkout.use-case';

@Controller('sales')
export class SaleController {
    constructor(private readonly checkoutUseCase: CheckoutUseCase) { }

    @Post('checkout')
    async checkout() {
        return this.checkoutUseCase.execute();
    }
}
