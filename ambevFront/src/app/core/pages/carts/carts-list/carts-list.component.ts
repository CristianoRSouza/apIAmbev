import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { BaseComponente } from '../../../shared/components/base/base.component';
import { PoModalComponent, PoPageAction, PoTableColumn } from '@po-ui/ng-components';
import { Cart } from '../../../shared/interfaces/cart.interface';
import { CartProduct } from '../../../shared/interfaces/cart-product.interface';
import { CartsService } from '../../../services/carts.service';
import { Pagination } from '../../../shared/interfaces/pagination.interface';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Utils from '../../../shared/utils/utils';

@Component({
  selector: 'app-carts-list',
  imports: [SharedModule],
  templateUrl: './carts-list.component.html',
  styleUrl: './carts-list.component.css'
})
export class CartsListComponent extends BaseComponente implements OnInit, AfterViewInit  {
  @ViewChild('modal', { static: true }) modal!: PoModalComponent;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  cartsService: CartsService = inject(CartsService);
  displayedColumns: string[] = ['id', 'userId', 'date', 'actions'];
  dataSource: MatTableDataSource<Cart> = new MatTableDataSource<Cart>(undefined);

  pageActions: PoPageAction[] = [
    {
      label: 'Create',
      action: () => this.redirectTo('/cart-create')
    }
  ]

  ngOnInit(): void {
    this._order = 'id desc, userId asc, date asc'
    this.getCarts();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getCarts() {
    this.cartsService.cartsList({
      _page: this._currentPage,
      _size: this._size,
      _order: this._order
    }).subscribe({
      next: (cart: Pagination<Cart>) => {
        this._page = cart.totalPages
        this._totalItems = cart.totalItems
        this.dataSource = new MatTableDataSource<Cart>(cart.data)
      }
    })
  }

  openModal(element: any) {
    this.modal.open();
  }

  edit(row: any) {
    this.redirectTo(`cart-edit/${row.id}`)
  }

  view(row: any) {
    this.redirectTo(`cart-info/${row.id}`)
  }

  delete(row: any) {
    this.cartsService.deleteCart(row.id).subscribe({
      next: () => {
        this.dataSource.data = this.dataSource.data.filter(item => item.id !== row.id);
      }
    })
  }

  sort(event: {active: string, direction: string}) {
    this._order = Utils.Sort(event, this._order);
    this.getCarts();
  }

  onPageChange(event: PageEvent) {
    if (this._currentPage === event.pageIndex + 1 && this._size === event.pageSize) {
      return;
    }

    this._currentPage = event.pageIndex + 1;
    this._size = event.pageSize;

    this.getCarts();
  }
}
