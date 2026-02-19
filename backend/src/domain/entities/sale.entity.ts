export class SaleItem {
    constructor(
        public readonly id: string,
        public readonly saleId: string,
        public readonly productId: string,
        public readonly quantity: number,
        public readonly priceAtSale: number,
    ) { }
}

export class Sale {
    constructor(
        public readonly id: string,
        public readonly total: number,
        public readonly createdAt: Date,
        public readonly items: SaleItem[],
    ) { }
}
