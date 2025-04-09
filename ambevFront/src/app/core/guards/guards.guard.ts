import { inject, Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { PoNotificationService } from '@po-ui/ng-components';
import Utils from '../shared/utils/utils';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  router: Router = inject(Router);
  notification: PoNotificationService = inject(PoNotificationService);

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = Utils.GetToken();

    if (!token) {
      this.router.navigate(['login']);

      return false;
    }

    return true;
  }
}