import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product, CartItem, Sale } from '../models/pos.models';
import { tap, catchError, of, forkJoin, map } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PosService {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:3000/api';

    // Signals for state management
    products = signal<Product[]>([]);
    cartItems = signal<CartItem[]>([]);
    loading = signal(false);
    error = signal<string | null>(null);

    // Computed totals
    cartTotal = computed(() => {
        return this.cartItems().reduce((acc, item) => acc + (item.price || 0) * item.quantity, 0);
    });

    cartCount = computed(() => {
        return this.cartItems().reduce((acc, item) => acc + item.quantity, 0);
    });

    loadProducts() {
        this.loading.set(true);
        this.http.get<Product[]>(`${this.apiUrl}/products`).subscribe({
            next: (data) => {
                this.products.set(data);
                this.loading.set(false);
            },
            error: (err) => {
                this.error.set('Error loading products');
                this.loading.set(false);
            }
        });
    }

    loadCart() {
        this.loading.set(true);
        this.http.get<CartItem[]>(`${this.apiUrl}/cart`).subscribe({
            next: (items) => {
                // Enriquecer el carrito con nombres y precios de los productos
                this.enrichCartItems(items);
                this.loading.set(false);
            },
            error: () => {
                this.error.set('Error loading cart');
                this.loading.set(false);
            }
        });
    }

    addToCart(productId: string, quantity: number = 1) {
        this.http.post(`${this.apiUrl}/cart/items`, { productId, quantity }).subscribe({
            next: () => this.loadCart(),
            error: (err) => {
                this.error.set(err.error?.message || 'Error adding to cart');
            }
        });
    }

    removeFromCart(productId: string) {
        this.http.delete(`${this.apiUrl}/cart/items/${productId}`).subscribe({
            next: () => this.loadCart(),
            error: () => this.error.set('Error removing from cart')
        });
    }

    checkout() {
        this.loading.set(true);
        return this.http.post<Sale>(`${this.apiUrl}/sales/checkout`, {}).pipe(
            tap((sale) => {
                this.cartItems.set([]);
                this.loadProducts();
                this.loading.set(false);
            }),
            catchError((err) => {
                this.error.set(err.error?.message || 'Error during checkout');
                this.loading.set(false);
                throw err;
            })
        );
    }

    private enrichCartItems(items: CartItem[]) {
        // Only fetch products if we don't have them
        if (this.products().length === 0) {
            this.http.get<Product[]>(`${this.apiUrl}/products`).subscribe(products => {
                this.products.set(products);
                this.processEnrichment(items, products);
            });
        } else {
            this.processEnrichment(items, this.products());
        }
    }

    private processEnrichment(items: CartItem[], products: Product[]) {
        const enriched = items.map(item => {
            const product = products.find(p => p.id === item.productId);
            return {
                ...item,
                productName: product?.name || 'Unknown',
                price: product?.price || 0
            };
        });
        this.cartItems.set(enriched);
    }

    clearError() {
        this.error.set(null);
    }
}
