import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthActivate {
  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(route: ActivatedRouteSnapshot): Promise<boolean | UrlTree> {
    const loginRequired = route.data['loginRequired'];

    await this.authService.initialize();

    if (
      loginRequired === undefined ||
      this.authService.isLoggedIn === loginRequired
    ) {
      return true;
    }

    return this.authService.isLoggedIn
      ? this.router.parseUrl('/openings/catalog')
      : this.router.parseUrl('/auth/login');
  }
}
