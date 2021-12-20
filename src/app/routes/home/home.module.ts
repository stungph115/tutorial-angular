
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 
import { HomeComponent } from './home.component';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { DropzoneModule, DROPZONE_CONFIG, DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { LoginService } from 'src/app/services/login/login.service';

export const homeRoute: Routes = [
    {
        path: '',
        component: HomeComponent,
    }
];


const DROPZONECONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
  
  url: 'http://localhost:3000/user/insertPhoto',
  acceptedFiles: '.jpg, .jpeg, .png',
  maxFilesize: 10,
  maxFiles: 1,   

};

@NgModule({
  declarations: [
    
    HomeComponent
  ],
  entryComponents: [ HomeComponent],

  imports: [
    CommonModule,
    DropzoneModule,
    RouterModule.forChild(homeRoute),
    
  ],


  exports: [ RouterModule ],
  providers: [
    {
      provide: DROPZONE_CONFIG,
      useValue: DROPZONECONFIG,
    }
  ]
})
export class HomeRoutingModule { }