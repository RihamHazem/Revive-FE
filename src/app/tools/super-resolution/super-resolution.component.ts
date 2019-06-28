import { Component, OnInit, Input } from '@angular/core';
import {ShareDataService} from '../../share-data.service';

@Component({
  selector: 'app-super-resolution',
  templateUrl: './super-resolution.component.html',
  styleUrls: ['./super-resolution.component.css']
})
export class SuperResolutionComponent implements OnInit {
  private imageString: string;
  private originalImage: string;
  private imageName: string;
  imageOrig = false;

  constructor(private shareDataService: ShareDataService) { }

  ngOnInit() {
    this.shareDataService.currentMessage.subscribe(({img, name}) => {
      this.originalImage = img;
      this.imageName = name;
    });
    this.shareDataService.newMessage.subscribe((img) => {
      this.imageString = img;
    });
  }

  setOrigImage() {
    this.imageOrig = true;
  }
  setResolImage() {
    this.imageOrig = false;
  }

}
