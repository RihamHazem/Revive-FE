import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestRequestsService {
  apiUrl = 'http://127.0.0.1:5000/';
  // private options = { headers: new HttpHeaders().set('Content-Type', 'multipart/mixed; boundary="xxxx"') };
  constructor(private http: HttpClient) { }
  interColrImage(img: string, positions, imgInfo) {
    const params = {img, positions, imgInfo};
    return this.http.post<any>(this.apiUrl + 'inter-colorize', params);
  }
  autoColrImage(img: string) {
    const params = {img};
    return this.http.post<any>(this.apiUrl + 'auto-colorize', params);
  }
  superResImage(img: string) {
    const params = {img};
    return this.http.post<any>(this.apiUrl + 'super-res', params);
  }
}
