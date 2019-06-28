import { Component, OnInit, Input } from '@angular/core';
import {ShareDataService} from '../../share-data.service';

@Component({
  selector: 'app-auto-colorization',
  templateUrl: './auto-colorization.component.html',
  styleUrls: ['./auto-colorization.component.css']
})
export class AutoColorizationComponent implements OnInit {

  private imageString: string;
  private origImage: string;
  private imageName: string;
  imageBW = false;
  constructor(private shareDataService: ShareDataService) { }

  ngOnInit() {
    this.shareDataService.currentMessage.subscribe(({img, name}) => {
      this.origImage = img;
      this.imageName = name;
    });
    this.shareDataService.newMessage.subscribe((img) => {
      this.imageString = img;
    });
  }


  setBWImage() {
    this.imageBW = true;
  }
  setColorImage() {
    this.imageBW = false;
  }
}
