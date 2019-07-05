import {Component, HostListener, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Revive';
  mode = 'upload'; // whether resolution or interactive or colorization
  imageUrl: string|ArrayBuffer;
  imageOffset = {val: -1, direc: false, oldWidth: 0, oldHeight: 0, newWidth: 0, newHeight: 0}; // false: width, true: height
  imageName: string;
  constructor(private router: Router) {
  }

  ngOnInit() {
  }
  interColorizationMode(imgFile: File) {
    const reader = new FileReader();
    reader.readAsDataURL(imgFile);
    reader.onload = () => {
      this.mode = 'interactive';
      this.imageUrl = reader.result;
    };
    console.log(imgFile);
  }

  autoColorizationMode(imgFile: File) {
    const reader = new FileReader();
    reader.readAsDataURL(imgFile);
    reader.onload = () => {
      this.mode = 'auto';
      this.imageUrl = reader.result;
      this.imageName = imgFile.name;
    };
  }

  superResolutionMode(imgFile: File) {
    const reader = new FileReader();
    reader.readAsDataURL(imgFile);
    reader.onload = () => {
      this.mode = 'res';
      this.imageUrl = reader.result;
      this.imageName = imgFile.name;
    };
  }

}
