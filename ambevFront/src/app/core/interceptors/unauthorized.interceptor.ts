import { inject, Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { PoNotificationService } from '@po-ui/ng-components';

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {
  router: Router = inject(Router);
  notification: PoNotificationService = inject(PoNotificationService);

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.router.navigate(['/login']);
          this.notification.error('Access denied. Please log in again.');
        }
        return throwError(error);
      })
    );
  }
}