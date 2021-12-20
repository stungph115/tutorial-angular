
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 
import { LoginComponent } from './login.component';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
export const loginRoute: Routes = [
    {
        path: '',
        component: LoginComponent,
    }
];

@NgModule({
  declarations: [
    
    LoginComponent
  ],
  entryComponents: [ LoginComponent],

  imports: [
    
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule.forChild(loginRoute)
  ],


  exports: [ RouterModule ]
})
export class LoginRoutingModule { }