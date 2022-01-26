import { Router, ActivatedRoute } from '@angular/router';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService,
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        console.warn('Error', error);
        let errorMessage = 'An unknown error occurred';

        if (error.error.message) {
          errorMessage = error.error.message;
        }

        // console.log('http error', error);
        if (error.status === 401) {
          this.loginService.logoutQueryParams();
        }

        // this.dialog.open(ErrorComponent, {data: { message: errorMessage}});
        return throwError(null);
      }),
    );
  }
}
