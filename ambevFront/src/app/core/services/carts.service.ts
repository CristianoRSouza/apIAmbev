import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AppService } from '../../app.service';
import { Observable, take } from 'rxjs';
import { Pagination } from '../shared/interfaces/pagination.interface';
import type { Cart, CartCreate } from '../shared/interfaces/cart.interface';
import { GetAllQuery } from '../shared/interfaces/query.interface';

@Injectable({
  providedIn: 'root'
})
export class CartsService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly appService: AppService = inject(AppService);
  private readonly endpoint: string = `${this.appService.apiUrl}`;

  cartsCreate(cart: CartCreate): Observable<Cart> {
    return this.http.post<Cart>(`${this.endpoint}/carts`, cart).pipe(take(1));
  }

  cartsList(query: GetAllQuery): Observable<Pagination<Cart>> {
    return this.http.get<Pagination<Cart>>(`${this.endpoint}/carts`, {
      params: {
        _page: query._page,
        _size: query._size,
        _order: query._order
      }
    }).pipe(take(1))
  }

  cartsUpdate(id: number, cart: CartCreate): Observable<Cart> {
    return this.http.put<Cart>(`${this.endpoint}/carts/${id}`, cart).pipe(take(1));
  }

  cartsListOne(id: number): Observable<Cart> {
    return this.http.get<Cart>(`${this.endpoint}/carts/${id}`).pipe(take(1));
  }

  deleteCart(id: number): Observable<Cart> {
    return this.http.delete<Cart>(`${this.endpoint}/carts/${id}`).pipe(take(1));
  }
}
