import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestRequestsService {
  apiUrl = 'localhost:5000/';
  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  constructor(private http: HttpClient) { }
  interColrImage(img: string, positions) {
    const params = {img, positions};
    return this.http.post<any>(this.apiUrl + 'colorize', params, this.options);
  }
  autoColrImage(img: string) {
    const params = {img};
    return this.http.post<any>(this.apiUrl + 'auto-colorize', params, this.options);
  }
  superResImage(img: string) {
    const params = {img};
    return this.http.post<any>(this.apiUrl + 'super-res', params, this.options);
  }
}
