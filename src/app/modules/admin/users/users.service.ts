import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

const API_URL = environment.apiUrl + '/users';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient, router: Router) {}

  createUser(params: any): Observable<any> {
    return this.http.put<any>(API_URL, params);
  }

  updateUser(params: any): Observable<any> {
    return this.http.patch<any>(API_URL + '/' + params.id, params);
  }

  getUser(id: number): Observable<any> {
    return this.http.get<any>(API_URL + '/' + id);
  }

  getUsers(params: any): Observable<any> {
    return this.http.post<any>(API_URL, params);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(API_URL + '/' + id);
  }
}
