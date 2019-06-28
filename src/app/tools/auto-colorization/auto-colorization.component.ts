import { Component, OnInit, Input } from '@angular/core';
import {ShareDataService} from '../../share-data.service';
import {RestRequestsService} from '../../rest-requests.service';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-auto-colorization',
  templateUrl: './auto-colorization.component.html',
  styleUrls: ['./auto-colorization.component.css']
})
export class AutoColorizationComponent implements OnInit {

  private imageString: string;
  private loading = false;
  private sendError = false;
  private messageError = 'Error in sending Image, Maybe it\'s a connection problem';
  private origImage: string;
  private imageName: string;
  imageBW = false;
  constructor(private shareDataService: ShareDataService, private restRequestsService: RestRequestsService,
              private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.shareDataService.currentMessage.subscribe(({img, name}) => {
      this.origImage = img;
      this.imageName = name;
    });
    this.shareDataService.newMessage.subscribe((img) => {
      this.imageString = img;
    });
    if (this.origImage === '') {
      this.router.navigateByUrl('/');
    }
  }
  superResImage() {
    this.loading = true;
    this.restRequestsService.superResImage(this.imageString).subscribe((data) => {
      // response is the colorized image
      if (data.hasOwnProperty('img')) {
        // super resolution image
        this.imageString = data.img;
      } else {
        this.sendError = true;
      }
      this.loading = false;
    }, (error1) => {
      this.sendError = true;
      this.loading = false;
    });
  }

  setBWImage() {
    this.imageBW = true;
  }
  setColorImage() {
    this.imageBW = false;
  }
  close() {
    this.sendError = false;
    this.loading = false;
  }
}
