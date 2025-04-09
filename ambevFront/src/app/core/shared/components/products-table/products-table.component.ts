import { Component, Input, OnInit } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { Product } from '../../interfaces/products.interface';
import { PoTableColumn } from '@po-ui/ng-components';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.css'],
  imports: [SharedModule],
})
export class ProductsTableComponent implements OnInit {
  _items: any[] = [];

  @Input('items') items: Product[] = [];

  columns: PoTableColumn[] = [
    {
      property: 'id',
      label: 'ID',
    },
    {
      property: 'title',
      label: 'Title',
    },
    {
      property: 'price',
      label: 'Price',
    },
    {
      property: 'category',
      label: 'Category',
    },
    {
      property: 'rating.rate',
      label: 'Rating',
    },
  ];

  constructor() {
  }
  
  ngOnInit() {
    this._items = this.items;
  }
}
