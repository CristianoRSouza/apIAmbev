import {
  AfterViewInit,
  Component,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { BaseComponente } from '../../../shared/components/base/base.component';
import { SharedModule } from '../../../shared/shared.module';
import {
  PoPageAction,
} from '@po-ui/ng-components';
import { Product } from '../../../shared/interfaces/products.interface';
import { ProductsService } from '../../../services/produtos.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Utils from '../../../shared/utils/utils';

@Component({
  selector: 'app-products-list',
  imports: [SharedModule],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css',
})
export class ProductsListComponent
  extends BaseComponente
  implements OnInit, AfterViewInit
{
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  productsService: ProductsService = inject(ProductsService);

  pageActions: PoPageAction[] = [
    {
      label: 'Create',
      action: () => this.redirectTo('/product-create'),
    },
  ];
  displayedColumns: string[] = ['id', 'title', 'price', 'category', 'rating', 'actions'];
  dataSource: MatTableDataSource<Product> = new MatTableDataSource<Product>(
    undefined
  );

  ngOnInit(): void {
    this._order = 'id asc, title asc, price asc, category asc';
    this.getProducts();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
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
          this.dataSource.data = products.data;
        },
      });
  }

  edit(row: any) {
    this.redirectTo(`product-edit/${row.id}`);
  }

  view(row: any) {
    this.redirectTo(`product-info/${row.id}`);
  }

  delete(row: any) {
    this.productsService.deleteProduct(row.id).subscribe({
      next: () => {
        this.dataSource.data = this.dataSource.data.filter(
          (item) => item.id !== row.id
        );
      },
    });
  }

  sort(event: { active: string; direction: string }) {
    this._order = Utils.Sort(event, this._order);
    this.getProducts();
  }

  onPageChange(event: PageEvent) {
    if (
      this._currentPage === event.pageIndex + 1 &&
      this._size === event.pageSize
    ) {
      return;
    }

    this._currentPage = event.pageIndex + 1;
    this._size = event.pageSize;

    this.getProducts();
  }
}
