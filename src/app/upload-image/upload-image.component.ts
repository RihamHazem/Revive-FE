import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {ShareDataService} from '../share-data.service';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent implements OnInit {
  @Output() private options: EventEmitter<File> = new EventEmitter();
  private invalidFiles: any = [];
  uploadError = false;
  messageError = '';
  private imageString: string | ArrayBuffer;
  private imageName: string;

  constructor(private router: Router, private shareDataService: ShareDataService) {
  }

  ngOnInit() {
  }

  onFilesChange(file: Array<File>) {
    if (this.uploadError === true) {
      return;
    }
    this.optionsMode(file[0]);
  }

  onFileInvalids(status: string) {
    if (status === 'invalid file') {
      this.uploadError = true;
      this.messageError = 'Invalid type image. The supported types are [jpg, jpeg, png]. Please, try another image';
    } else if (status === 'multiple files') {
      this.uploadError = true;
      this.messageError = 'You cannot upload multiple files. Just one image';
    }
  }

  optionsMode(imgFile: File) {
    const reader = new FileReader();
    reader.readAsDataURL(imgFile);
    reader.onload = () => {
      this.imageString = reader.result;
      this.imageName = imgFile.name;
      this.shareDataService.changeMessage(this.imageString.toString(), this.imageName);
      this.router.navigateByUrl('/tools');
    };
  }

  close() {
    this.uploadError = false;
    this.messageError = '';
  }
}
