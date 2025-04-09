import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AppService } from '../../app.service';
import { Observable, take } from 'rxjs';
import { User } from '../shared/interfaces/users.interface';
import { Pagination } from '../shared/interfaces/pagination.interface';
import { GetAllQuery } from '../shared/interfaces/query.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly appService: AppService = inject(AppService);
  private readonly endpoint: string = `${this.appService.apiUrl}`;

  userCreate(user: User): Observable<User> {
    return this.http.post<User>(`${this.endpoint}/users`, user);
  }

  userList(query: GetAllQuery): Observable<Pagination<User>> {
    return this.http.get<Pagination<User>>(`${this.endpoint}/users`, {
      params: {
        _page: query._page,
        _size: query._size,
        _order: query._order
      }
    }).pipe(take(1));
  }

  userUpdate(id: string, user: User): Observable<User> {
    return this.http.put<User>(`${this.endpoint}/users/${id}`, user).pipe(take(1));
  }

  userListOne(id: string): Observable<User> {
    return this.http.get<User>(`${this.endpoint}/users/${id}`).pipe(take(1));
  }

  deleteUser(id: string): Observable<User> {
    return this.http.delete<User>(`${this.endpoint}/users/${id}`).pipe(take(1));
  }
}
