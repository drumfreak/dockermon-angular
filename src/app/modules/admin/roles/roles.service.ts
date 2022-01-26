import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

const API_URL = environment.apiUrl + '/roles';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  constructor(private http: HttpClient, router: Router) {}

  createRole(params: any): Observable<any> {
    return this.http.put<any>(API_URL, params);
  }

  updateRole(params: any): Observable<any> {
    return this.http.patch<any>(API_URL + '/' + params.id, params);
  }

  getRole(id: number): Observable<any> {
    return this.http.get<any>(API_URL + '/' + id);
  }

  getRoles(params: any): Observable<any> {
    return this.http.post<any>(API_URL, params);
  }
}
