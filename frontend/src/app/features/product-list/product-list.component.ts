import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PosService } from 'src/app/core/services/pos.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  posService = inject(PosService);

  ngOnInit() {
    this.posService.loadProducts();
  }

  trackByProductId(index: number, product: any): number {
    return product.id;
  }
}
