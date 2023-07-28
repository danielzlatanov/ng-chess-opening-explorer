import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { NotificationService } from 'src/app/shared/components/notification/notification.service';

@Injectable({
  providedIn: 'root',
})
export class AuthActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private notifService: NotificationService
  ) {}

  async canActivate(route: ActivatedRouteSnapshot): Promise<boolean | UrlTree> {
    const loginRequired = route.data['loginRequired'];

    await this.authService.initialize();

    if (
      loginRequired === undefined ||
      this.authService.isLoggedIn === loginRequired
    ) {
      return true;
    }

    this.notifService.showNotification('Please login first!');

    return this.authService.isLoggedIn
      ? this.redirectToCatalog()
      : this.redirectToLogin();
  }

  redirectToCatalog(): UrlTree {
    this.notifService.showNotification('You are already logged in.');
    return this.router.parseUrl('/openings/catalog');
  }

  redirectToLogin(): UrlTree {
    this.notifService.showNotification('Please sign in first.');
    return this.router.parseUrl('/auth/login');
  }
}
