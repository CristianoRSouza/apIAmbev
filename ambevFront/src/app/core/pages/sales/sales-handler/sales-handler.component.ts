import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import {
  PoModalAction,
  PoModalComponent,
  PoPageAction,
  PoTableAction,
  PoTableColumn,
  PoTableComponent,
} from '@po-ui/ng-components';
import { Product } from '../../../shared/interfaces/products.interface';
import { Pagination } from '../../../shared/interfaces/pagination.interface';
import { BaseComponente } from '../../../shared/components/base/base.component';
import { SaleRequest, Sales } from '../../../shared/interfaces/sales.interface';
import { SalesService } from '../../../services/sales.service';
import { ProductsService } from '../../../services/produtos.service';

@Component({
  selector: 'app-sales-handler',
  templateUrl: './sales-handler.component.html',
  styleUrls: ['./sales-handler.component.css'],
  imports: [SharedModule],
})
export class SalesHandlerComponent extends BaseComponente implements OnInit {
  @ViewChild('modalProducts', { static: true })
  modalProducts!: PoModalComponent;
  @ViewChild('table', { static: true }) poTable!: PoTableComponent;

  salesService: SalesService = inject(SalesService);
  saleService: SalesService = inject(SalesService);
  productsService: ProductsService = inject(ProductsService);

  table_columns: PoTableColumn[] = [
    {
      property: 'id',
      label: 'ID',
      width: '130px',
    },
    {
      property: 'title',
      label: 'Title',
      width: '130px',
    },
    {
      property: 'price',
      label: 'Price',
      width: '130px',
    },
  ];
  columns_products: PoTableColumn[] = [
    {
      property: 'title',
      label: 'Title',
      width: '130px',
    },
    {
      property: 'price',
      label: 'Price',
      type: 'cellTemplate',
      width: '130px',
    },
    {
      property: 'quantity',
      label: 'Quantity',
      type: 'cellTemplate',
      width: '130px',
    },
    {
      property: 'discount',
      label: 'Discount',
      width: '130px',
      type: 'cellTemplate',
    },
    {
      property: 'totalPrice',
      width: '130px',
      label: 'Total Price',
      type: 'cellTemplate',
    },
  ];
  page_actions: PoPageAction[] = [];
  products: any[] = [];
  table_items: any[] = [];
  title: string = 'New Sale';
  sale_id: string = '';
  hasInfo: boolean = false;

  table_action: PoTableAction[] = [
    {
      label: '',
      icon: 'an an-trash',
      action: (row: any) => {
        this.poTable.unselectRowItem((item) => item.id == row.id);
        this.products.splice(this.products.indexOf(row), 1);
      },
    },
  ];

  cancelModal: PoModalAction = {
    label: 'Fechar',
    action: () => {
      this.modalProducts.close();
    },
  };

  ngOnInit() {
    this.sale_id = this.route.snapshot.params['id'];

    this.configurePageActions(this.sale_id);
    this.getProducts();
  }

  configurePageActions(sale_id: string) {
    if (!sale_id) {
      this.page_actions = [
        {
          label: 'Sale',
          action: () => this.save(),
        },
      ];

      this.getSales();
      return;
    }

    if (this.route.snapshot.url[0].path == 'sales-info') {
      this.hasInfo = true;
      this.page_actions = [
        {
          label: 'Back',
          action: () => window.history.back(),
        },
      ];
      this.title = 'Info Sale';
      this.getSales();

      return;
    }

    this.page_actions = [
      {
        label: 'Edit Sale',
        action: () => this.edit(),
      },
    ];
    this.title = 'Edit Sale';
    this.getSales();
  }

  save() {
    if (this.hasQuantityZero()) {
      this.notification.information('Quantity must be greater than 0');
      return;
    }

    const sale: SaleRequest = {
      customerID: '1',
      products: this.products.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        discount: item.discount,
        totalPrice: item.totalPrice,
      })),
    };

    this.saleService.saleCreate(sale).subscribe({
      next: (response) => {
        this.notification.success('Sale created successfully');
        this.router.navigate(['/sales-list']);
      },
      error: (error) => {
        this.notification.error('Error creating sale');
      },
    });
  }

  edit() {
    if (this.hasQuantityZero()) {
      this.notification.information('Quantity must be greater than 0');
      return;
    }

    const sale: SaleRequest = {
      customerID: '1',
      products: this.products.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        discount: item.discount,
        totalPrice: item.totalPrice,
      })),
    };

    this.saleService.saleUpdate(this.sale_id, sale).subscribe({
      next: (response) => {
        this.notification.success('Sale updated successfully');
        this.router.navigate(['/sales-list']);
      },
      error: (error) => {
        this.notification.error('Error updating sale');
      },
    });
  }

  hasQuantityZero() {
    return this.products.some((item) => item.quantity === 0);
  }

  getSales() {
    this.saleService.saleListOne(this.sale_id).subscribe({
      next: (response: Sales) => {
        this.products = response.products;
      },
    });
  }

  getProducts() {
    this.productsService
      .productList({
        _order: 'asc',
        _page: 1,
        _size: 10000,
      })
      .subscribe({
        next: (response: Pagination<Product>) => {
          this.table_items = response.data.map((item) => ({
            ...item,
            quantity: 0,
            discount: 0,
          }));
        },
      });
  }

  openModalProducts() {
    this.modalProducts.open();
  }

  mathUnitPrice(row: any) {
    if (row.quantity === 0 || row.price === 0) {
      return;
    }

    this.setValuesToItemAfterChange(row);
  }

  mathQuantity(row: any) {
    if (row.quantity > 20) {
      this.notification.information('Quantity must be less than 20');
      return;
    }

    if (row.price > 0) {
      this.setValuesToItemAfterChange(row);
    }
  }

  setValuesToItemAfterChange(row: any) {
    let discount = 0;
    if (row.quantity > 4) discount = 10;
    if (row.quantity > 10 && row.quantity < 20) discount = 20;

    row.discount = discount;
    row.totalPrice = this.mathPercent(row, discount);
  }

  mathPercent(row: any, discount: number) {
    const value = row.price * row.quantity;
    const response = value * (discount / 100);
    return value - response;
  }

  onSelectProduto(row: any) {
    this.products.push(row);
    this.poTable.unselectRowItem((item) => item.id == row.id);
    this.modalProducts.close();
  }

  getColumnName(name: string, id: number) {
    return `${name}_${id}`;
  }
}
