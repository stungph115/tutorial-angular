
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 
import { DetailuserComponent } from './detailuser.component';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import{MatInputModule} from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';


export const detailuserRoute: Routes = [
    {
        path: '',
        component: DetailuserComponent,
    }
];

@NgModule
({
  declarations: 
  [
    
    DetailuserComponent
  ],

  entryComponents: [ DetailuserComponent],

  imports:
  [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTableModule,
    MatFormFieldModule,
    RouterModule.forChild( detailuserRoute)
  ],


  exports: [ RouterModule ]
})

export class DetailuserRoutingModule { }