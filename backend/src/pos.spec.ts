import { CheckoutUseCase } from './application/use-cases/checkout.use-case';
import { InsufficientStockException } from './domain/exceptions/domain.exceptions';
import { Product } from './domain/entities/product.entity';
import { CartItem } from './domain/entities/cart-item.entity';

describe('POS Critical Unit Tests', () => {
    let checkoutUseCase: CheckoutUseCase;
    let mockProductRepo: any;
    let mockCartRepo: any;
    let mockSaleRepo: any;

    beforeEach(() => {
        mockProductRepo = {
            findById: jest.fn(),
            decrementStock: jest.fn(),
        };
        mockCartRepo = {
            getItems: jest.fn(),
            clear: jest.fn(),
        };
        mockSaleRepo = {
            save: jest.fn((sale) => Promise.resolve({ ...sale, id: 'sale-123' })),
        };
        checkoutUseCase = new CheckoutUseCase(mockProductRepo, mockCartRepo, mockSaleRepo);
    });

    it('SHOULD calculate correct total for a sale', async () => {
        const productA = new Product('p1', 'Product A', 10, 100);
        const productB = new Product('p2', 'Product B', 20, 100);

        mockCartRepo.getItems.mockResolvedValue([
            new CartItem('c1', 'p1', 2),
            new CartItem('c2', 'p2', 1),
        ]);
        mockProductRepo.findById.mockImplementation((id) => {
            if (id === 'p1') return Promise.resolve(productA);
            if (id === 'p2') return Promise.resolve(productB);
        });
        mockProductRepo.decrementStock.mockResolvedValue(1);

        const sale = await checkoutUseCase.execute();

        expect(sale.total).toBe(40);
        expect(mockSaleRepo.save).toHaveBeenCalled();
        expect(mockCartRepo.clear).toHaveBeenCalled();
    });

    it('SHOULD reject sale if stock is insufficient and not create sale', async () => {
        const productA = new Product('p1', 'Product A', 10, 5);

        mockCartRepo.getItems.mockResolvedValue([
            new CartItem('c1', 'p1', 10),
        ]);
        mockProductRepo.findById.mockResolvedValue(productA);
        mockProductRepo.decrementStock.mockResolvedValue(0);

        await expect(checkoutUseCase.execute()).rejects.toThrow(InsufficientStockException);
        expect(mockSaleRepo.save).not.toHaveBeenCalled();
        expect(mockCartRepo.clear).not.toHaveBeenCalled();
    });
});
