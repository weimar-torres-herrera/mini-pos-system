export class CartItem {
    constructor(
        public readonly id: string,
        public readonly productId: string,
        public quantity: number,
    ) { }
}
