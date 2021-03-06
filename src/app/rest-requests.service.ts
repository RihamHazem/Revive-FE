import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestRequestsService {
  apiUrl = 'http://e766ea02.ngrok.io/';
  // private options = { headers: new HttpHeaders().set('Content-Type', 'multipart/mixed; boundary="xxxx"') };
  constructor(private http: HttpClient) { }
  interColrImage(positions, imgToken) {
    const params = {positions, path: imgToken};
    // console.log(params);
    return this.http.post<any>(this.apiUrl + 'inter-colorize', params);
  }
  interAutoColrImage(img: string, imgInfo) {
    const params = {img, imgInfo};
    // console.log(params);
    return this.http.post<any>(this.apiUrl + 'inter-auto-colorize', params);
  }
  autoColrImage(img: string, model: number, sz: number) {
    const params = {img, model, sz};
    return this.http.post<{img1: string, img2: string}>(this.apiUrl + 'auto-colorize', params);
  }
  superResImage(img: string) {
    const params = {img};
    return this.http.post<any>(this.apiUrl + 'super-res', params);
  }
  deleteImage(path: string) {
    const params = {path};
    return this.http.post<any>(this.apiUrl + 'super-res', params);
  }
}
