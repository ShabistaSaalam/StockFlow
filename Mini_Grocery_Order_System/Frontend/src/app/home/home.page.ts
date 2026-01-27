import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { ProductService } from '../product.service';
import { OrderService } from '../../../../Frontend/src/app/order.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {

  products: any[] = [];
  quantities: { [key: number]: number } = {};
  message = '';

  constructor(
    private productService: ProductService,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
      next: data => this.products = data,
      error: () => this.message = 'Failed to load products'
    });
  }

  placeOrder(productId: number) {
    const quantity = this.quantities[productId];

    if (!quantity || quantity <= 0) {
      this.message = 'Enter valid quantity';
      return;
    }

    this.orderService.placeOrder(productId, quantity).subscribe({
      next: (res: any) => {
        this.message = res.message;
        this.loadProducts();
      },
      error: (err) => {
        this.message = err.error?.message || 'Order failed';
      }
    });
  }
}
