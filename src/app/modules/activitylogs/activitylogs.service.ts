import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../../../src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

const API_URL = environment.apiUrl + '/activitylogs';

@Injectable({
  providedIn: 'root',
})
export class ActivitylogsService {
  constructor(private http: HttpClient, router: Router) {}

  create(params: any): Observable<any> {
    return this.http.put<any>(API_URL, params);
  }

  update(params: any): Observable<any> {
    return this.http.patch<any>(API_URL + '/' + params.stage.id, params);
  }

  get(id: number): Observable<any> {
    return this.http.get<any>(API_URL + '/' + id);
  }

  getPaginated(params: any): Observable<any> {
    return this.http.post<any>(API_URL, params);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(API_URL + '/' + id);
  }
}
