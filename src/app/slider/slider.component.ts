import {Component, EventEmitter, Input, Output, OnInit} from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
  @Input() images = [];
  @Output() public currentImg = new EventEmitter();
  constructor() {
  }

  ngOnInit() {
  }
  updateImageDownload(event) {
    this.currentImg.emit(Number(event.direction === 'left'));
  }
}
