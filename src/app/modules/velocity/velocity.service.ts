import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class VelocityService {
  constructor(private http: HttpClient) {}

  getSprints(): Observable<any> {
    return this.http.get<any>(API_URL + '/velocity/getSprints');
  }

  getSprintVelocity(postData: any = {}): Observable<any> {
    return this.http.post<any>(
      API_URL + '/velocity/getSprintVelocity',
      postData,
    );
  }
}
