import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { BaseComponente } from '../../../shared/components/base/base.component';
import {
  PoModalComponent,
  PoTableAction,
  PoTableColumn,
} from '@po-ui/ng-components';
import { ProductsListComponent } from '../products-list/products-list.component';
import { ProductsService } from '../../../services/produtos.service';
import { ProductsTableComponent } from '../../../shared/components/products-table/products-table.component';
import { Pagination } from '../../../shared/interfaces/pagination.interface';
import { Product } from '../../../shared/interfaces/products.interface';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-products-categories',
  imports: [SharedModule, ProductsTableComponent],
  templateUrl: './products-categories.component.html',
  styleUrl: './products-categories.component.css',
})
export class ProductsCategoriesComponent
  extends BaseComponente
  implements OnInit
{
  @ViewChild('modal', { static: true }) modal!: PoModalComponent;

  productsService: ProductsService = inject(ProductsService);

  selected_category: string = '';
  displayedColumns: string[] = ['name', 'actions'];
  dataSource: MatTableDataSource<{ name: string }> = new MatTableDataSource<{
    name: string;
  }>(undefined);
  modal_closed: boolean = false;
  products: Product[] = [];

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.productsService.producCategoryList().subscribe({
      next: (res: string[]) => {
        this.dataSource.data = res.map((item) => ({ name: item }));
      },
    });
  }

  view(row: any) {
    this.selected_category = row.name;
    this.productsService
      .productListCategory(row.name)
      .subscribe((res: Pagination<Product>) => {
        this.products = res.data;
        this.modal_closed = !this.modal_closed;
        this.modal.open();
      });
  }

  closeModal() {
    this.products = [];
    this.modal_closed = !this.modal_closed;
  }

  getModalTitle() {
    return this.selected_category
      ? `Produtos da categoria ${this.selected_category}`
      : 'Selecione uma categoria';
  }
}
