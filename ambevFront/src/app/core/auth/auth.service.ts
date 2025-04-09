import { inject, Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, take, tap } from 'rxjs';
import { AuthInterface } from '../shared/interfaces/auth/auth.interface';
import { AppService } from '../../app.service';
import Utils from '../shared/utils/utils';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  appService: AppService = inject(AppService);

  private endpoint: string = this.appService.apiUrl;
  private lastUrl!: string;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.lastUrl = btoa('/');
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.lastUrl = btoa(event.url);
      }
    });
  }

  login(data: AuthInterface): Observable<any> {
    return this.http.post(`${this.endpoint}/Auth`, data).pipe(
      tap((data: any) => this.registerCredentials(data)),
      take(1)
    );
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  handleLoggin(path: string = this.lastUrl): void {
    this.router.navigate(['login']);
  }

  private registerCredentials(data: any): void {
    Utils.PostToken(data.data.data.token);
  }
}
