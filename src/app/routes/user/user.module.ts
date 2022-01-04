import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user.component';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatButtonModule} from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {MatTreeModule} from '@angular/material/tree';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatNativeDateModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { DateFormat } from 'src/app/app.module';
import { SharedPipeModule } from 'src/app/shared/pipes/shared-pipe.module';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { AdminListComponent } from './admin-list/admin-list.component';
import {MatDividerModule} from '@angular/material/divider';

export const userRoute: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      {
          path:'users', component: UserListComponent
      },
      {
          path: 'user/:id', component: UserDetailComponent
      },
      {
          path: 'admins', component: AdminListComponent
      }
  ]
  },
];

@NgModule({
  declarations: [
    UserComponent,
    UserListComponent,
    UserDetailComponent,
    AdminListComponent,
  ],
  entryComponents: [UserComponent],

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatSelectModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatStepperModule,
    CdkStepperModule,
    MatTreeModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatDatepickerModule,
    SharedPipeModule,
    MatDividerModule,
    RouterModule.forChild(userRoute),
  ],
  providers: [    
    { provide: MAT_DATE_FORMATS, useValue: DateFormat },
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' },
    
  ],

  exports: [RouterModule],
})
export class UserRoutingModule {
  constructor() {
    registerLocaleData(localeFr, 'fr');
  }
}

