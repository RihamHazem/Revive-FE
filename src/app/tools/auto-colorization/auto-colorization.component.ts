import { Component, OnInit, Input } from '@angular/core';
import {ShareDataService} from '../../share-data.service';
import {RestRequestsService} from '../../rest-requests.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-auto-colorization',
  templateUrl: './auto-colorization.component.html',
  styleUrls: ['./auto-colorization.component.css']
})
export class AutoColorizationComponent implements OnInit {

  private imageString: string;
  private imgWidth: number;
  private imgHeight: number;
  private loading = false;
  private sendError = false;
  private messageError = 'Error in sending Image, Maybe it\'s a connection problem';
  private origImage = [];
  private imageName: string;
  coloredImages = [];
  imageBW = false;
  downloadImage;
  constructor(private shareDataService: ShareDataService, private restRequestsService: RestRequestsService,
              private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.shareDataService.currentMessage.subscribe(({img, name}) => {
      this.origImage.push(img);
      this.origImage.push(img);
      const image = new Image();
      image.src = this.imageString;

      image.onload = () => {
        this.imgWidth = image.width;
        this.imgHeight = image.height;
      };
      this.imageName = name;
    });
    this.shareDataService.autoImages.subscribe(({img1, img2}) => {
      this.coloredImages.push(img1);
      this.coloredImages.push(img2);
      this.downloadImage = img1;
    });
    console.log(this.origImage);
    if (this.origImage[0] === '') {
      this.router.navigateByUrl('/');
    }
  }
  updateDownloadImg(idx) {
    console.log(idx);
    this.downloadImage = this.coloredImages[idx];
  }
  setBWImage() {
    this.imageBW = true;
  }
  setColorImage() {
    this.imageBW = false;
  }
  close() {
    this.sendError = false;
  }
}
