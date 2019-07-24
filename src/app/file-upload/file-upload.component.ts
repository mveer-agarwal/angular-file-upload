import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileUploader, FileItem } from 'ng2-file-upload';
import { HttpClient } from '@angular/common/http';
import { UploadService } from './upload.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  uploadForm: FormGroup;
  exts = ['png', 'jpg'];
  errorMessage: String;
  progress;
  errorMessages = {
    success: 'Documents uploaded successfully',
    error: 'Documents upload failed',
    warning: 'Uploaded document has some issues',
    extError: 'Uploaded document extension is not supported'
  };
  public files: Set<File> = new Set();

  @ViewChild('file') file;

  public uploader: FileUploader = new FileUploader({
    isHTML5: true
  });

  title: String = 'Angular File Upload';
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private uploadService: UploadService
  ) {}

  ngOnInit() {
    this.uploadForm = this.fb.group({
      document: [null, null],
      type: [null, Validators.compose([Validators.required])]
    });
  }

  chooseDocument() {
    this.file.nativeElement.click();
  }

  handleFileOver(évent: any) {
    console.log(event);
  }

  uploadSubmit() {
    for (let i = 0; i < this.uploader.queue.length; i++) {
      const fileItem = this.uploader.queue[i]._file;
      if (fileItem.size > 2000000) {
        this.errorMessage = this.errorMessages.extError;
        return;
      }
      const ext = fileItem.name.split('.').pop();
      if (!this.exts.includes(ext)) {
        this.errorMessage = this.errorMessages.extError;
        return;
      }

      this.files.add(fileItem);
    }

    this.progress = this.uploadService.upload(this.files);
  }
}
