import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../../src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  loggingIn = false;
  user: any;
  queryParams: any;
  oldRoute: any;

  private isLoggedIn = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  doLogin(user: any) {
    return this.http.post<any>(API_URL + '/auth/login', user);
  }
  public loginMessage = new BehaviorSubject('Login is in progress');

  subscriber(): Observable<any> {
    return this.loginMessage.asObservable();
  }

  persistLogin(response: any) {
    const token = response.token;
    this.user = response.user;
    this.isLoggedIn = true;
    // console.log('Persisting Login');
    if (token) {
      const now = new Date();
      localStorage.setItem('token', token);
      const expirationDate = new Date(now.getTime() + response.tokenExpires);
      localStorage.setItem('tokenExpires', expirationDate.toISOString());
    }
  }

  async getLoggedInUser() {
    const oldRoute = this.router.url.replace('#/', '').split('?')[0];
    if (
      oldRoute !== '/auth/login' &&
      oldRoute !== '/auth/logout' &&
      oldRoute !== '/dashboard' &&
      !oldRoute.includes('resetPassword') &&
      oldRoute !== '/'
    ) {
      this.oldRoute = oldRoute;
      this.queryParams = { ...this.route.snapshot.queryParams };
      this.queryParams.oldRoute = this.oldRoute;
      this.queryParams.redirectLogout = 1;
    }
    if (!this.user && !this.isLoggedIn) {
      this.loggingIn = true;
      let u: any;
      try {
        u = await this.http.get<any>(API_URL + '/auth/loggedIn').toPromise();
      } catch (error) {
        //  console.log(error);
        this.loginMessage.next('logout');
        this.logout(this.queryParams);
        this.loggingIn = false;
        return;
      }
      if (u.status === 'fail') {
        this.loginMessage.next('logout');
        this.logout(this.queryParams);
        this.loggingIn = false;
        return null;
      } else {
        this.user = u.user;
        this.loggingIn = false;
        this.isLoggedIn = true;
        this.persistLogin(u);
        return this.user;
      }
    } else if (!this.user && localStorage.getItem('token')) {
      let u: any;
      try {
        u = await this.http.get<any>(API_URL + '/auth/loggedIn').toPromise();
      } catch (error) {
        // console.log(error);
        this.loginMessage.next('logout');
        this.logout();
        this.loggingIn = false;
        return;
      }
      if (u.status === 'fail') {
        this.loggingIn = false;
        return null;
      } else {
        this.user = u.user;
        this.loggingIn = false;
        this.isLoggedIn = true;
        this.persistLogin(u);
        return this.user;
      }
    } else {
      this.loggingIn = false;
      return this.user;
    }
  }

  loggedIn(): boolean {
    return this.isLoggedIn;
  }

  async reAuth() {
    this.loggingIn = true;
    let u: any;
    try {
      u = await this.http.get<any>(API_URL + '/auth/loggedIn').toPromise();
    } catch (error) {
      //  console.log(error);
      this.loginMessage.next('logout');
      this.logout(this.queryParams);
      this.loggingIn = false;
      return;
    }
    if (u.status === 'fail') {
      this.loginMessage.next('logout');
      this.logout(this.queryParams);
      this.loggingIn = false;
      return null;
    } else {
      this.user = u.user;
      this.loggingIn = false;
      this.isLoggedIn = true;
      this.persistLogin(u);
      return this.user;
    }
  }

  async logout(queryParams: any = null) {
    try {
      await this.http.get<any>(API_URL + '/auth/logout').toPromise();
    } catch (error) {
      // do nothing really.
    }
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpires');
    localStorage.removeItem('app');
    this.user = null;
    this.isLoggedIn = false;
    this.loginMessage.next('logout');

    if (queryParams) {
      if (queryParams.oldRoute) {
        if (!queryParams.oldRoute.includes('resetPassword')) {
          localStorage.setItem('queryParams', JSON.stringify(queryParams));
          // console.log('Logout from redirect', queryParams);
          this.router.navigate(['/auth/login']);
        }
      }
    } else {
      localStorage.removeItem('queryParams');
      if (!this.router.url.includes('resetPassword')) {
        this.router.navigate(['/auth/login']);
      }
    }
  }

  async logoutQueryParams() {
    const queryParams = { ...this.route.snapshot.queryParams };
    const currentRoute = this.router.url.replace('#/', '').split('?')[0];
    if (
      currentRoute !== '/auth/login' &&
      currentRoute !== '/auth/logout' &&
      !currentRoute.includes('resetPassword')
    ) {
      // console.log('URL', this.router.url);
      // queryParams.redirectLogout = 1;
      queryParams.oldRoute = currentRoute;
      // console.log('QueryParams', queryParams);
      // this.router.navigate(['/logout'], { queryParams }); // Need to get QueryParams
      this.logout(queryParams);
    }
  }

  async isAuthorized(allowedRoles: [string]): Promise<boolean> {
    if (this.user) {
      return true;
      // return allowedRoles.includes(this.user.role.name);
    } else {
      return false;
    }
  }

  verifyReCaptcha(response: any): Observable<any> {
    const postData = { response };
    return this.http.post<any>(API_URL + '/auth/verifyReCaptcha', postData);
  }
}
