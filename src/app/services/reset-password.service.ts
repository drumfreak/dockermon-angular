import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../../src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class ResetPasswordService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  forgotPassword(customerEmail: string): Observable<any> {
    const authData = { customerEmail };
    return this.http.post<any>(API_URL + '/auth/forgotPassword', authData);
  }

  resetPasswordWithToken(password: string, token: string) {
    const authData = { password, token };
    return this.http.post<any>(API_URL + '/auth/resetPassword', authData);
  }
}
