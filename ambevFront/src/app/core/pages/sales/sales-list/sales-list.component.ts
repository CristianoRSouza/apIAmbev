import {
  AfterViewInit,
  Component,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { PoPageAction } from '@po-ui/ng-components';
import { Sales } from '../../../shared/interfaces/sales.interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SalesService } from '../../../services/sales.service';
import { BaseComponente } from '../../../shared/components/base/base.component';

@Component({
  selector: 'app-sales-list',
  templateUrl: './sales-list.component.html',
  styleUrls: ['./sales-list.component.css'],
  imports: [SharedModule],
})
export class SalesListComponent extends BaseComponente implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  salesService: SalesService = inject(SalesService);

  page_actions: PoPageAction[] = [
    {
      label: 'New Sale',
      url: '/sales-create',
    },
  ];
  displayedColumns: string[] = [
    'SaleId',
    'customerId',
    'quantities',
    'total_amount',
    'status',
    'actions',
  ];
  dataSource: MatTableDataSource<Sales> = new MatTableDataSource<Sales>(
    undefined
  );

  ngOnInit() {
    this.getSales();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getSales() {
    this.salesService.saleList().subscribe({
      next: (res: any) => {
        this.dataSource.data = res.data;
      },
    });
  }

  edit(row: any) {
    this.redirectTo(`sales-edit/${row.SaleId}`);
  }

  view(row: any) {
    this.redirectTo(`sales-info/${row.SaleId}`);
  }

  delete(row: any) {
    this.salesService.deleteSale(row.SaleId).subscribe({
      next: () => {
        this.dataSource.data = this.dataSource.data.filter(
          (item) => item.SaleId !== row.SaleId
        );
      },
    });
  }
}
