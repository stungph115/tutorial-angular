import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTableModule } from '@angular/material/table';
import { RouterModule, Routes } from '@angular/router';
import {
  DropzoneConfigInterface,
  DropzoneModule,
  DROPZONE_CONFIG,
} from 'ngx-dropzone-wrapper';
import { ArchivageExpComponent } from './archivage-exp.component';
import { MatTooltipModule } from '@angular/material/tooltip';

export const archivageExpRoute: Routes = [
  {
    path: '',
    component: ArchivageExpComponent,
  },
];
/* 
  const DROPZONECONFIG: DropzoneConfigInterface = {
    // Change this to your upload POST address:
    url: 'http://localhost:3000/upload-exp/',
    
     
  };*/
@NgModule({
  declarations: [ArchivageExpComponent],

  entryComponents: [ArchivageExpComponent],

  imports: [
    CommonModule,
    MatTableModule,
    DropzoneModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatTooltipModule,
    RouterModule.forChild(archivageExpRoute),
  ],

  exports: [RouterModule],
  /* providers: [
        {
          provide: DROPZONE_CONFIG,
          useValue: DROPZONECONFIG,
        }
      ] */
})
export class ArchivageExpRoutingModule {}
