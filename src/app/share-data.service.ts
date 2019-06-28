import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {
  private messageSource = new BehaviorSubject<{img: string, name: string}>({img: '', name: ''});
  private newMessageSource = new BehaviorSubject<string>('');
  currentMessage = this.messageSource.asObservable();
  newMessage = this.newMessageSource.asObservable();
  constructor() { }

  changeMessage(img: string, name: string) {
    this.messageSource.next({img, name});
  }
  changeNewMessage(img: string) {
    this.newMessageSource.next(img);
  }
}
