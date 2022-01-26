import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AppComponent } from './app.component';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private app: AppComponent) {}

  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const user = await this.app.getLoggedInUser();
    if (!user) {
      return false;
    }

    const authed = await this.app.loginService.isAuthorized(next.data.roles || []);
    if (!authed) {
      window.alert('Access Denied, Login is Required to Access This Page!');
      this.router.navigate(['/auth/login']);
    }
    return true;
  }
}
