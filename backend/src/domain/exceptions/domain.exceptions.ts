export class DomainException extends Error {
    constructor(public readonly message: string, public readonly code?: string) {
        super(message);
        this.name = 'DomainException';
    }
}

export class InsufficientStockException extends DomainException {
    constructor(productName: string) {
        super(`Insufficient stock for product: ${productName}`, 'INSUFFICIENT_STOCK');
    }
}
