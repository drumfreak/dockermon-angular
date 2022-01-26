import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = localStorage.getItem('token');

    let useToken = authToken;

    // if (request.url.includes('/api')) {
    //     useToken = this.otherToken;
    // } else {
    //     useToken = authToken;
    // }

    request = request.clone({
      headers: request.headers.set('Authorization', 'Bearer ' + useToken),
    });

    return next.handle(request);
  }
}
