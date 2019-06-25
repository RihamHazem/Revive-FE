import {Directive, EventEmitter, HostBinding, HostListener, Input, Output} from '@angular/core';

@Directive({
  selector: '[appDragAndDrop]'
})
export class DragAndDropDirective {
  @Input() private allowedExtensions: Array<string> = [];
  @Output() private filesChangeEmiter: EventEmitter<File[]> = new EventEmitter();
  @Output() private filesInvalidEmiter: EventEmitter<string> = new EventEmitter();

  constructor() { }
  @HostBinding('style.outline-offset') private outlineOffset = '#eee';
  @HostBinding('style.outline-color') private outlineColor = '#CCCCCC';
  @HostBinding('style.color') private txtColor = '#CCCCCC';
  @HostListener('dragover', ['$event']) onDragOver(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.outlineOffset = '-20px';
    this.outlineColor = '#84B9D3';
    this.txtColor = '#84B9D3';
  }
  @HostListener('dragleave', ['$event']) public onDragLeave(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.outlineOffset = '-10px';
    this.outlineColor = '#CCCCCC';
    this.txtColor = '#CCCCCC';
  }

  @HostListener('drop', ['$event']) public onDrop(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    const droppedFiles = evt.dataTransfer.files;
    this.outlineColor = '#CCCCCC';
    this.txtColor = '#CCCCCC';
    this.outlineOffset = '-10px';
    if (droppedFiles.length === 1) {
      const validFiles: Array<File> = [];

      for (const file of droppedFiles) {
        const filename = file.name.toLowerCase();
        const ext = filename.split('.')[filename.split('.').length - 1];
        console.log(ext);
        if (this.allowedExtensions.lastIndexOf(ext) !== -1) {
          console.log('valid');
          validFiles.push(file);
        } else {
          // invalid file type error
          this.filesInvalidEmiter.emit('invalid file');
          return;
        }
      }
      this.filesChangeEmiter.emit(validFiles);
    } else if (droppedFiles.length > 1) {
      // show an error to the user
      this.filesInvalidEmiter.emit('multiple files');
    }
  }
}
