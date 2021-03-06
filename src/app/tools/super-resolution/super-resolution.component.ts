import { Component, OnInit, Input } from '@angular/core';
import {ShareDataService} from '../../share-data.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-super-resolution',
  templateUrl: './super-resolution.component.html',
  styleUrls: ['./super-resolution.component.css']
})
export class SuperResolutionComponent implements OnInit {
  private originalImage = [];
  private imageName: string;
  imageOrig = false;
  imgWidth = 0;
  imgHeight = 0;
  downloadImage = '';
  resImages = [];

  constructor(private shareDataService: ShareDataService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.shareDataService.currentMessage.subscribe(({img, name}) => {
      this.originalImage.push(img);
      this.originalImage.push(img);
      this.imageName = name;
    });
    this.shareDataService.autoImages.subscribe(({img1, img2, width, height}) => {
      this.resImages.push(img1);
      this.resImages.push(img2);
      this.downloadImage = img1;
      this.imgWidth = width;
      this.imgHeight = height;
    });
    if (this.originalImage[0] === '') {
      this.router.navigateByUrl('/');
    }
  }

  updateDownloadImg(idx) {
    console.log(idx);
    this.downloadImage = this.resImages[idx];
  }
  setOrigImage() {
    this.imageOrig = true;
  }
  setResolImage() {
    this.imageOrig = false;
  }

}
