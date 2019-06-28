import { Component, OnInit, Input } from '@angular/core';
import {ShareDataService} from '../../share-data.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-super-resolution',
  templateUrl: './super-resolution.component.html',
  styleUrls: ['./super-resolution.component.css']
})
export class SuperResolutionComponent implements OnInit {
  private imageString: string;
  private originalImage: string;
  private imageName: string;
  imageOrig = false;

  constructor(private shareDataService: ShareDataService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.shareDataService.currentMessage.subscribe(({img, name}) => {
      this.originalImage = img;
      this.imageName = name;
    });
    this.shareDataService.newMessage.subscribe((img) => {
      this.imageString = img;
    });
    if (this.originalImage === '') {
      this.router.navigateByUrl('/');
    }
  }

  setOrigImage() {
    this.imageOrig = true;
  }
  setResolImage() {
    this.imageOrig = false;
  }

}
