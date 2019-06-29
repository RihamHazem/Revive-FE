import {Component, OnInit, Input, Inject} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ShareDataService} from '../share-data.service';
import {RestRequestsService} from '../rest-requests.service';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material';

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
              private restReqService: RestRequestsService,
              public dialog: MatDialog) {
    this.imageString = this.route.snapshot.queryParamMap.get('imageString');
    this.imageName = this.route.snapshot.queryParamMap.get('imageName');
  }
  ngOnInit() {
    this.shareDataService.currentMessage.subscribe(({img, name}) => {
      this.imageString = img;
      this.imageName = name;
    });
    if (this.imageString === '') {
      this.router.navigateByUrl('/');
    }
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      data: 0
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      this.colorizeImage(result);
    });
  }
  public colorizeImage(model: number) { // number of the model that user chose
    this.loading = true;
    this.restReqService.autoColrImage(this.imageString, model).subscribe((data) => {
      // response is the colorized image
      if (data.hasOwnProperty('img')) {
        // black and white image
        this.shareDataService.changeMessage(this.imageString, this.imageName);
        // colorized image
        this.shareDataService.changeNewMessage(data.img);
        this.loading = false;
        this.router.navigateByUrl('/tools/auto');
      } else {
        this.sendError = true;
        this.loading = false;
      }
    }, error1 => {
      this.sendError = true;
      this.loading = false;
    });
  }
  superResImage() {
    this.loading = true;
    this.restReqService.superResImage(this.imageString).subscribe((data) => {
      // response is the colorized image
      if (data.hasOwnProperty('img')) {
        // original image
        this.shareDataService.changeMessage(this.imageString, this.imageName);
        // super resolution image
        this.shareDataService.changeNewMessage(data.img);
        this.loading = false;
        this.router.navigateByUrl('/tools/super');
      } else {
        this.sendError = true;
        this.loading = false;
      }
    }, (error1) => {
      this.sendError = true;
      this.loading = false;
    });
  }
  close() {
    this.sendError = false;
    this.loading = false;
  }
}


@Component({
  selector: 'app-dialog',
  templateUrl: 'dialog.component.html',
})
export class DialogComponent {
  models = ['GANs All Objects', 'Specifically Faces Approach#1', 'Specifically Faces Approach#2'];
  selectedModel = 0;

  constructor(@Inject(MAT_DIALOG_DATA) public data: number) {}

}
