import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestRequestsService {
  apiUrl = 'http://ffc5a0e2.ngrok.io/';
  // private options = { headers: new HttpHeaders().set('Content-Type', 'multipart/mixed; boundary="xxxx"') };
  constructor(private http: HttpClient) { }
  interColrImage(img: string, positions, imgInfo) {
    const params = {img, positions, imgInfo};
    // console.log(params);
    return this.http.post<any>(this.apiUrl + 'inter-colorize', params);
  }
  autoColrImage(img: string, model) {
    const params = {img, model};
    return this.http.post<{img: string}>(this.apiUrl + 'auto-colorize', params);
  }
  superResImage(img: string) {
    const params = {img};
    return this.http.post<any>(this.apiUrl + 'super-res', params);
  }
}
