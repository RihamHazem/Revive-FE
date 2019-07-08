import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {
  private messageSource = new BehaviorSubject<{img: string, name: string}>({img: '', name: ''});
  private interMessageSource = new BehaviorSubject<{
    img: string,
    imgToken: string,
    imgOffset: { val: number, dir: boolean, newWidth: number, newHeight: number }
  }>({
    img: '',
    imgToken: '', imgOffset: { val: 0, dir: true, newWidth: 0, newHeight: 0 }});
  private autoImagesSource = new BehaviorSubject<{img1: string, img2}>({img1: '', img2: ''});
  private newMessageSource = new BehaviorSubject<string>('');
  currentMessage = this.messageSource.asObservable();
  newMessage = this.newMessageSource.asObservable();
  interMessage = this.interMessageSource.asObservable();
  autoImages = this.autoImagesSource.asObservable();
  constructor() { }

  changeMessage(img: string, name: string) {
    this.messageSource.next({img, name});
  }
  changeNewMessage(img: string) {
    this.newMessageSource.next(img);
  }
  changeAutoImages(img1: string, img2: string) {
    this.autoImagesSource.next({img1, img2});
  }
  changeInterMessage(img: string, imgToken: string, imgOffset: { val: number, dir: boolean, newWidth: number, newHeight: number }) {
    this.interMessageSource.next({img, imgToken, imgOffset});
  }
}
