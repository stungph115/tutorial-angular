import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UploadComponent } from './upload.component';
import { DropzoneModule, DROPZONE_CONFIG, DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import {MatButtonModule} from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';


export const uploadRoute: Routes = [
  {
    path: '',
    component: UploadComponent,
  },
];
const DROPZONECONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
  url: 'http://localhost:3000/upload/upload',
  acceptedFiles: '.jpg, .jpeg, .png, .pdf',
  maxFilesize: 50,  
  
};

@NgModule({
  declarations: [UploadComponent],
  entryComponents: [UploadComponent],
  imports: [
    MatTableModule,
    CommonModule,
    DropzoneModule,
    MatButtonModule,
    RouterModule.forChild(uploadRoute),

  ],
  exports : [RouterModule],
  providers: [
    {
      provide: DROPZONE_CONFIG,
      useValue: DROPZONECONFIG,
    }
  ]
})
export class UploadRoutingModule { }
