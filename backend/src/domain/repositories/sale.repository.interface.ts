import { Sale } from '../entities/sale.entity';

export interface ISaleRepository {
    save(sale: Sale): Promise<Sale>;
    findById(id: string): Promise<Sale | null>;
}
