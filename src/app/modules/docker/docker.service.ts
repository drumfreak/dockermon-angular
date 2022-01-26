import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

const API_URL = environment.apiUrl + '/containers';
const API_URL_STATS = environment.apiUrl + '/stats';

@Injectable({
  providedIn: 'root',
})
export class DockerService {
  constructor(private http: HttpClient, router: Router) {}

  getContainersPaginated(params: any): Observable<any> {
    return this.http.post<any>(API_URL, params);
  }

  getContainerById(id: number): Observable<any> {
    return this.http.get<any>(API_URL + '/' + id);
  }

  getStats(params: any): Observable<any> {
    return this.http.post<any>(API_URL_STATS, params);
  }

}
