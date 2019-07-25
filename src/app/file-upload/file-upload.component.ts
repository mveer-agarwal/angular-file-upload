import {
  Component,
  ViewChild,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { FileUploader, FileItem } from 'ng2-file-upload';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {
  @Input() config: Object;
  @Input() progress;
  @Output() uploadFiles = new EventEmitter();
  @ViewChild('file') file;

  public files: Set<File> = new Set();
  public uploader: FileUploader = new FileUploader({
    isHTML5: true
  });

  chooseDocument() {
    this.file.nativeElement.click();
  }

  handleFileOver(évent: any) {
    console.log(event);
  }

  addFiles() {
    for (let i = 0; i < this.uploader.queue.length; i++) {
      const fileItem = this.uploader.queue[i]._file;
      this.files.add(fileItem);
      this.uploadFiles.emit(this.files);
    }
  }
}
