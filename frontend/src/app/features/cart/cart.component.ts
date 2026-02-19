import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PosService } from '../../core/services/pos.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  posService = inject(PosService);

  onCheckout() {
    this.posService.checkout().subscribe({
      next: (sale) => {
        alert(`Venta realizada con éxito! ID: ${sale.id}`);
      },
      error: (err) => {
      }
    });
  }

  trackByCartItemId(index: number, item: any): number {
    return item.productId;
  }
}
