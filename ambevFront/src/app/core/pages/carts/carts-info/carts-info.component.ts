import { Component, inject, OnInit } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { BaseComponente } from '../../../shared/components/base/base.component';
import { PoDynamicViewField, PoPageAction, PoTableColumn } from '@po-ui/ng-components';
import { ProductsListComponent } from '../../products/products-list/products-list.component';
import { CartsService } from '../../../services/carts.service';
import { Cart } from '../../../shared/interfaces/cart.interface';

@Component({
  selector: 'app-carts-info',
  imports: [SharedModule],
  templateUrl: './carts-info.component.html',
  styleUrl: './carts-info.component.css'
})
export class CartsInfoComponent extends BaseComponente implements OnInit {
  cartsService: CartsService = inject(CartsService);

  actions: PoPageAction[] = [
    {
      label: 'Voltar',
      action: () => this.redirectTo('carts-list')
    }
  ]
  fields: PoDynamicViewField[] = [
    {
      property: 'id',
      label: 'ID',
    },
    {
      property: 'userId',
      label: 'User ID'
    },
    {
      property: 'date',
      label: 'Date',
      type: 'date'
    }
  ]

  columns_products: PoTableColumn[] = [
    {
      label: 'Product ID',
      property: 'productId',
      type: 'number'
    },
    {
      property: 'quantity',
      label: 'Quantity',
      type: 'number'
    }
  ]

  values!: Cart;
  cart_id: number = 0;

  ngOnInit(): void {
    this.cart_id = this.route.snapshot.params['id'];
    this.getCart()
  }

  getCart() {
    this.cartsService.cartsListOne(this.cart_id).subscribe({
      next: (cart: Cart) => {
        this.values = cart;
      }
    })
  }

}
