import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { BaseComponente } from '../../../shared/components/base/base.component';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { PoDynamicFormField, PoModalAction, PoModalComponent, PoPageAction, PoTableColumn, type PoDynamicFormLoad } from '@po-ui/ng-components';
import { CartProduct } from '../../../shared/interfaces/cart-product.interface';
import { CartsService } from '../../../services/carts.service';
import { Cart, CartCreate } from '../../../shared/interfaces/cart.interface';
import { AppService } from '../../../../app.service';
import { ProductsService } from '../../../services/produtos.service';
import { Product } from '../../../shared/interfaces/products.interface';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carts-handler',
  imports: [SharedModule, FormsModule,],
  templateUrl: './carts-handler.component.html',
  styleUrl: './carts-handler.component.css'
})
export class CartsHandlerComponent extends BaseComponente implements OnInit {
  cartsService: CartsService = inject(CartsService);
  productsService: ProductsService = inject(ProductsService);

  appService: AppService = inject(AppService);
  @ViewChild('modal', {static: true}) modal!: PoModalComponent;
  cart_id: number = 0;
  products: Product[] = [];
  selected_products: CartProduct[] = [];
  selected_quantity: number = 0;
  selected_product: number = 0;
  dynamicForm!: NgForm;
  actions: PoPageAction[] = [
    {
      label: 'Save',
      action: () => this.save()
    },
    {
      label: 'Add Product',
      action: (row: any) => {
        this.selected_product = row;
        this.openModal()
      }
    },
    {
      label: 'Back',
      action: () => this.router.navigate(['/carts-list'])
    },
  ]
  fields: PoDynamicFormField[] = [
    {
      property: 'userId',
      label: 'User ID',
      type: 'number',
      required: true,
      showRequired: true,
      gridColumns: 4,
    },
    {
      property: 'date',
      label: 'Date',
      type: 'date',
      required: true,
      showRequired: true,
      gridColumns: 4
    },
  ]
  columns_products: PoTableColumn[] = [
    {
      label: 'Product ID',
      property: 'productId',
    },
    {
      label: 'Quantity',
      property: 'quantity',
    },
  ]
  cart_values!: CartCreate;

  primaryAction: PoModalAction = {
    label: 'Add Product',
    action: () => this.addProduct()
  }

  ngOnInit(): void {
    this.cart_id = this.route.snapshot.params['id'];
    if (this.cart_id) {
      this.getCart();
    }

    this.getProducts();
  }
  
  getCart() {
    this.cartsService.cartsListOne(this.cart_id).subscribe({
      next: (cart: Cart) => {
        this.cart_values = cart;
        this.selected_products = cart.products;
      }
    })
  }

  getProducts() {
    this.productsService
      .productList({
        _page: this._currentPage,
        _size: this._size,
        _order: this._order,
      })
      .subscribe({
        next: (products) => {
          this._page = products.totalPages;
          this._totalItems = products.totalItems;
          this.products = [...products.data];
        },
      });
  }

  getForm(form: NgForm) {
    this.dynamicForm = form;
  }

  openModal() {
    this.modal.open();
  }

  closeModal() {
    this.selected_product = 0;
    this.selected_quantity = 0;
    this.modal.close();
  }

  save() {
    if (!this.dynamicForm.form.valid) {
      this.notification.warning('Fill in all the fields');
      return;
    }

    if (this.selected_products.length === 0) {
      this.notification.warning('Select at least one product');
      return;
    }

    const data: CartCreate = {
      ...this.dynamicForm.form.value,
      products: this.selected_products
    }

    if (this.cart_id) {
      this.updateCart(data);
      return;
    }

    this.createCart(data);
  }

  updateCart(data: CartCreate) {
    this.cartsService.cartsUpdate(this.cart_id, data).subscribe({
      next: () => {
        this.notification.success('Cart updated successfully');
        this.router.navigate(['/carts-list']);
      },
      error: () => {
        this.notification.error('Error updating cart');
      }
    })
  }

  createCart(data: CartCreate) {
    this.cartsService.cartsCreate(data).subscribe({
      next: () => {
        this.notification.success('Cart created successfully');
        this.router.navigate(['/carts-list']);
      },
      error: () => {
        this.notification.error('Error creating cart');
      }
    })
  }

  addProduct() {
    if (!this.selected_product || !this.selected_quantity) {
      this.notification.warning('Selecione um produto e a quantidade');
      return;
    }

    this.selected_products.push({
      productId: this.selected_product,
      quantity: this.selected_quantity
    })
    this.closeModal();
  }

  onSelectProduct(product_id: number) {
    this.selected_product = product_id;
  }

  cancel() {
    this.router.navigate(['/carts-list'])
  }
}
