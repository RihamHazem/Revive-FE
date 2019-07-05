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
  private newMessageSource = new BehaviorSubject<string>('');
  currentMessage = this.messageSource.asObservable();
  newMessage = this.newMessageSource.asObservable();
  interMessage = this.interMessageSource.asObservable();
  constructor() { }

  changeMessage(img: string, name: string) {
    this.messageSource.next({img, name});
  }
  changeNewMessage(img: string) {
    this.newMessageSource.next(img);
  }
  changeInterMessage(img: string, imgToken: string, imgOffset: { val: number, dir: boolean, newWidth: number, newHeight: number }) {
    this.interMessageSource.next({img, imgToken, imgOffset});
  }
}
