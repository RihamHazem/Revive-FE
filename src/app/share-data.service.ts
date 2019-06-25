import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {
  private messageSource = new BehaviorSubject<{img: string, name: string}>({img: '', name: ''});
  currentMessage = this.messageSource.asObservable();
  constructor() { }

  changeMessage(img: string, name: string) {
    this.messageSource.next({img, name});
  }
}
