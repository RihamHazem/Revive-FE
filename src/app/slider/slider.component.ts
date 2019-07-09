import {Component, EventEmitter, Input, Output, OnInit} from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
  @Input() images = [];
  @Input() imgWidth = 0;
  @Input() imgHeight = 0;
  @Output() public currentImg = new EventEmitter();
  constructor() {
  }

  ngOnInit() {
    console.log(this.images.length);
  }
  updateImageDownload(event) {
    console.log(event);
    const cur = Number(event.current.split('-')[2]);
    const prev = Number(event.prev.split('-')[2]);
    if (cur < prev) {
      this.currentImg.emit(0);
    } else {
      this.currentImg.emit(1);
    }
  }
  getPadding() {
    const factor = 384 / this.imgWidth;
    const newHeight = this.imgHeight * factor;
    return (newHeight - 384) / 2;
  }
}
