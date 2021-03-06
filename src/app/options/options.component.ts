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
  private imageOffset: { val: number, dir: boolean, newWidth: number, newHeight: number };
  divWidth = 384;
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
      width: '600px',
      data: {model: 0, sz: 255}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result === undefined) {
        this.loading = false;
        return;
      }
      console.log(result);
      this.colorizeImage(result);
    });
  }
  public colorizeImage({model, sz}) { // number of the model that user chose
    this.loading = true;
    this.restReqService.autoColrImage(this.imageString, model, sz)
      .subscribe((data) => { // TODO: make the size number be chosen from the user
      // response is the colorized image
      console.log('Data:', data);
      if (data.hasOwnProperty('img1')) {
        const image = new Image();
        image.src = this.imageString;

        image.onload = () => {
          const width = image.width;
          const height = image.height;
          // black and white image
          this.shareDataService.changeMessage(this.imageString, this.imageName);
          // colorized image
          this.shareDataService.changeAutoImages(data.img1, data.img2, width, height);
          this.loading = false;
          this.router.navigateByUrl('/tools/auto');
        };
      } else {
        this.sendError = true;
        this.loading = false;
      }
    }, error1 => {
      console.log(error1);
      this.sendError = true;
      this.loading = false;
    });
  }
  public interAutoColorizeImage() { // number of the model that user chose
    this.loading = true;
    const imgInfo = {
      newWidth: this.imageOffset.newWidth,
      newHeight: this.imageOffset.newHeight
    };
    this.restReqService.interAutoColrImage(this.imageString, imgInfo).subscribe((data) => {
      // response is the colorized image
      if (data.hasOwnProperty('name')) {
        console.log('Data:', data);
        // black and white image
        this.shareDataService.changeMessage(data.image, this.imageName);
        // colorized image
        const imgToken = data.name;
        console.log('Token', imgToken);
        this.shareDataService.changeInterMessage(data.image, imgToken, this.imageOffset);
        this.loading = false;
        this.router.navigateByUrl('/tools/inter');
      } else {
        this.sendError = true;
        this.loading = false;
      }
    }, error1 => {
      console.log(error1);
      this.sendError = true;
      this.loading = false;
    });
  }
  superResImage() {
    this.loading = true;
    this.restReqService.superResImage(this.imageString).subscribe((data) => {
      // response is the colorized image
      console.log(data);
      if (data.hasOwnProperty('img1')) {
        const image = new Image();
        image.src = this.imageString;

        image.onload = () => {
          const width = image.width;
          const height = image.height;
          // black and white image
          this.shareDataService.changeMessage(this.imageString, this.imageName);
          // colorized image
          this.shareDataService.changeAutoImages(data.img1, data.img2, width, height);
          this.loading = false;
          this.router.navigateByUrl('/tools/super');
        };
        // // original image
        // this.shareDataService.changeMessage(this.imageString, this.imageName);
        // // super resolution image
        // this.shareDataService.changeResImages(data.img1, data.img2);
        // this.loading = false;
        // this.router.navigateByUrl('/tools/super');
      } else {
        this.sendError = true;
        this.loading = false;
      }
    }, (error1) => {
      this.sendError = true;
      this.loading = false;
    });
  }
  constructImageOffsets() {
    const image = new Image();
    image.src = this.imageString;

    image.onload = () => {
      const width = image.width;
      const height = image.height;
      console.log('Size', width, height);
      this.imageOffset = {val: 0, dir: true, newWidth: 0, newHeight: 0};
      let offset = -1;
      if (width > height) {
        offset = (this.divWidth / width) * height;
        this.imageOffset.dir = false;
        this.imageOffset.newWidth = this.divWidth;
        this.imageOffset.newHeight = offset;
      } else {
        offset = (this.divWidth / height) * width;
        this.imageOffset.dir = true;
        this.imageOffset.newWidth = offset;
        this.imageOffset.newHeight = this.divWidth;
      }
      offset = ((this.divWidth - offset) / 2);
      this.imageOffset.val = offset;
      this.interAutoColorizeImage();
    };
  }
  close() {
    this.sendError = false;
  }
}


@Component({
  selector: 'app-dialog',
  templateUrl: 'dialog.component.html',
})
export class DialogComponent {
  models = ['Nature', 'Faces', 'All Objects'];
  sizes = [512, 384, 256, 192, 128];
  selectedModel = 0;
  selectedSize = 512;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {model: 0, sz: 512}) {}
}
