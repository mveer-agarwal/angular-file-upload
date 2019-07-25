import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UploadService } from '../app/file-upload/upload.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: String = 'Angular File Upload';
  uploadForm: FormGroup;
  files = new Set<File>();
  progress;
  errorMessage;

  config: Object = {
    extType: 'image/*',
    exts: ['png', 'jpg'],
    errorMessages: {
      success: 'Documents uploaded successfully',
      error: 'Documents upload failed',
      warning: 'Uploaded document has some issues',
      extError: 'Uploaded document extension is not supported'
    }
  };

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

  addFiles(files) {
    this.files = files;
  }

  uploadSubmit() {
    console.log('Mahvaeer');
    // for (let i = 0; i < this.files; i++) {
    //   const fileItem = this.uploader.queue[i]._file;
    //   if (fileItem.size > 2000000) {
    //     this.errorMessage = this.errorMessages.extError;
    //     return;
    //   }
    //   const ext = fileItem.name.split('.').pop();
    //   if (!this.exts.includes(ext)) {
    //     this.errorMessage = this.errorMessages.extError;
    //     return;
    //   }
    //   this.files.add(fileItem);
    // }
    this.progress = this.uploadService.upload(this.files);
  }
}
