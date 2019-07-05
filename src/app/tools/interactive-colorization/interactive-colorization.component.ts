import {Component, HostListener, OnInit} from '@angular/core';
import {ColorEvent} from 'ngx-color';
import {RestRequestsService} from '../../rest-requests.service';
import {ShareDataService} from '../../share-data.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-interactive-colorization',
  templateUrl: './interactive-colorization.component.html',
  styleUrls: ['./interactive-colorization.component.css']
})
export class InteractiveColorizationComponent implements OnInit {
  private imageString: string;
  private imageColorized: string;
  private imgToken = '';
  private imageOffset: { val: number, dir: boolean, newWidth: number, newHeight: number };
  private imageName: string;

  constructor(private restRequestsService: RestRequestsService,
              private shareDataService: ShareDataService,
              private route: ActivatedRoute,
              private router: Router) {
    // window.onunload = this.deleteImage;
    // window.onbeforeunload = () => {
    //   console.log('event');
    //   alert('hello');
    //   return false;
    // };
  }
  colorizeButtonStr = 'Colorize';
  state = {r: 0, g: 0, b: 0, a: 0};
  points = [];
  positions = [];
  positionsStyle = [];
  isHidden = [];
  curColor: { r: number, g: number, b: number, a: number } = {r: 0, g: 0, b: 0, a: 0};
  selectedPos = -1;
  selectedElem = null;
  imageBW = false;
  private sendError = false;
  private messageError = 'Error in sending Image, Maybe it\'s a connection problem';
  private loading = false;

  static getRGBA(clr: { r: number, g: number, b: number, a: number }): string {
    return 'rgb(' + clr.r + ', ' + clr.g + ', ' + clr.b + ')';
  }
  // @HostListener('window:beforeunload', ['$event'])
  // beforeloadHandler(event) {
  //   alert('hello');
  //   this.deleteImage();
  // }
  ngOnInit() {
    this.shareDataService.currentMessage.subscribe(({img, name}) => {
      this.imageString = img;
      this.imageName = name;
    });
    this.shareDataService.interMessage.subscribe(({img, imgToken, imgOffset}) => {
      this.imageColorized = img;
      this.imgToken = imgToken;
      this.imageOffset = imgOffset;
    });
    if (this.imageColorized === '') {
      this.router.navigateByUrl('/');
    }
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadHandler(event) {
    // this.deleteImage();
    // tell back-end to delete image
    console.log(event);
    this.restRequestsService.deleteImage(this.imgToken).subscribe((data) => {
      console.log('Data', data);
      // alert('hello');
    });
    event.returnValue = true;
  }
  goodBye() {
    alert('Goodbye, Riham!');
  }
  changeComplete(colorEvent: ColorEvent) {
    this.curColor = colorEvent.color.rgb;
    if (this.selectedElem !== null) {
      this.positions[this.selectedPos]['background-color'] = InteractiveColorizationComponent.getRGBA(this.curColor);
      this.positionsStyle[this.selectedPos]['background-color'] = this.positions[this.selectedPos]['background-color'];
    }
    console.log(colorEvent);
  }

  addPoint(clickEvent) {
    const targetId = clickEvent.target.id;
    // if the clicked elem is the close image
    if (targetId.includes('close-')) {
      this.deletePoint();
      return;
    }
    // check that the clicked point isn't on a point
    if (this.selectedElem !== null) {
      this.selectedElem.classList.remove('selected-point');
      if (this.selectedElem === clickEvent.target) {
        this.selectedElem = null;
        this.selectedPos = -1;
        return;
      }
      this.selectedElem = null;
      this.selectedPos = -1;
    }
    if (targetId.includes('point-')) {
      this.selectedPos = Number(clickEvent.target.id.substr(6));
      this.selectedElem = clickEvent.target;
      this.selectedElem.classList.add('selected-point');
      return;
    }
    let x = clickEvent.offsetX;
    let y = clickEvent.offsetY;
    if (this.imageOffset.dir === false) {
      // width is greater
      if (y < this.imageOffset.val || y > this.imageOffset.val + this.imageOffset.newHeight) {
        return;
      }
      y -= this.imageOffset.val;
    } else {
      if (x < this.imageOffset.val || x > this.imageOffset.val + this.imageOffset.newWidth) {
        return;
      }
      x -= this.imageOffset.val;
    }
    this.points.push(this.points.length);
    this.positions.push({
      left: x,
      top: y,
      'background-color': InteractiveColorizationComponent.getRGBA(this.curColor)
    });
    this.positionsStyle.push({
      left: clickEvent.offsetX,
      top: clickEvent.offsetY,
      'background-color': InteractiveColorizationComponent.getRGBA(this.curColor)
    });
    console.log(this.positions);
    console.log(this.positionsStyle);
    this.isHidden.push(false);
  }

  deletePoint() {
    this.isHidden[this.selectedPos] = true;
    this.selectedElem.classList.add('delete-point');
    this.selectedElem = null;
    this.selectedPos = -1;
  }

  setBWImage() {
    this.imageBW = true;
  }

  setColorImage() {
    this.imageBW = false;
  }

  colorizeImage() {
    this.loading = true;
    const filteredPositions = [];
    let i = 0;
    for (const elem of this.isHidden) {
      console.log(this.isHidden);
      if (elem === false) {
        filteredPositions.push(this.positions[i]);
      }
      i += 1;
    }
    console.log('Token', this.imgToken);
    this.restRequestsService.interColrImage(filteredPositions, this.imgToken).subscribe((data) => {
      if (data.hasOwnProperty('image')) {
        this.imageColorized = data.image;
      } else {
        console.log('ERROR:', data);
        this.sendError = true;
      }
      this.loading = false;
    }, error1 => {
      console.log('ERROR:', error1);
      this.sendError = true;
      this.loading = false;
    });
  }
  close() {
    this.sendError = false;
  }
  restoreOriginal() {
    this.isHidden.fill(true);
  }
  deleteImage() {
  }
}
