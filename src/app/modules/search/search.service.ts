import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

const API_URL = environment.apiUrl + '/search';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient, router: Router) {}

  search(params: any): Observable<any> {
    return this.http.post<any>(API_URL, params);
  }
}
