import { Component, OnInit, Input } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ShareDataService} from '../share-data.service';
import {RestRequestsService} from '../rest-requests.service';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {
  private imageString: string;
  private imageName: string;
  loading = false;
  sendError = false;
  messageError = 'Error in sending Image, Maybe it\'s a connection problem';
  constructor(private route: ActivatedRoute,
              private router: Router,
              private shareDataService: ShareDataService,
              private restReqService: RestRequestsService) {
    this.imageString = this.route.snapshot.queryParamMap.get('imageString');
    this.imageName = this.route.snapshot.queryParamMap.get('imageName');
  }
  ngOnInit() {
    this.shareDataService.currentMessage.subscribe(({img, name}) => {
      this.imageString = img;
      this.imageName = name;
    });
  }
  colorizeImage() {
    this.loading = true;
    this.restReqService.autoColrImage(this.imageString).subscribe((img) => {
      // response is the colorized image
      this.shareDataService.changeMessage(img, this.imageName);
      this.loading = false;
      this.router.navigateByUrl('/auto');
    }, error1 => {
      this.sendError = true;
      this.loading = false;
    });
  }
  superResImage() {
    this.loading = true;
    this.restReqService.superResImage(this.imageString).subscribe((img) => {
      // response is the colorized image
      this.shareDataService.changeMessage(img, this.imageName);
      this.loading = false;
      this.router.navigateByUrl('/super');
    }, (error1) => {
      this.sendError = true;
    });
  }
  close() {
    this.sendError = false;
    this.loading = false;
  }
}
