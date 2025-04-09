import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AppService } from '../../app.service';
import { Observable, take } from 'rxjs';
import { Pagination } from '../shared/interfaces/pagination.interface';
import { SaleRequest, Sales } from '../shared/interfaces/sales.interface';

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly appService: AppService = inject(AppService);
  private readonly endpoint: string = `${this.appService.apiUrl}`;

  saleCreate(sale: SaleRequest): Observable<Sales> {
    return this.http.post<Sales>(`${this.endpoint}/sales`, sale);
  }

  saleList(): Observable<Pagination<Sales>> {
    return this.http.get<Pagination<Sales>>(`${this.endpoint}/sales`).pipe(take(1));
  }

  saleUpdate(id: string, sale: SaleRequest): Observable<Sales> {
    return this.http.put<Sales>(`${this.endpoint}/sales/${id}`, sale).pipe(take(1));
  }

  saleListOne(id: string): Observable<Sales> {
    return this.http.get<Sales>(`${this.endpoint}/sales/${id}`).pipe(take(1));
  }

  deleteSale(id: string): Observable<Sales> {
    return this.http.delete<Sales>(`${this.endpoint}/sales/${id}`).pipe(take(1));
  }
}
