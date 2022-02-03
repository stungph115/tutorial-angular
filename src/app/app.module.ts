import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditContactComponent } from './edit-contact/edit-contact.component';
import {MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { EditDetailUserComponent } from './edit-detail-user/edit-detail-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { HttpClientModule } from '@angular/common/http';
import {MatMenuModule} from '@angular/material/menu';
import { MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import { AddUserComponent } from './add-user/add-user.component';
import { AddContactComponent } from './add-contact/add-contact.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatStepperModule} from '@angular/material/stepper';
import {CdkStepperModule} from '@angular/cdk/stepper';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import {MatTreeModule} from '@angular/material/tree';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSliderModule} from '@angular/material/slider';
import {MatSidenavModule} from '@angular/material/sidenav';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { DateAdapter, MatNativeDateModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { SharedPipeModule } from './shared/pipes/shared-pipe.module';
import { AddFileComponent } from './add-file/add-file.component';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { AlertDeleteFileComponent } from './alert-delete-file/alert-delete-file.component';
import { Page404Component } from './page404/page404.component';
import { ChartsModule } from 'ng4-charts/ng4-charts';
import { ChartValueComponent } from './chart-value/chart-value.component';
import 'hammerjs';
import 'chartjs-plugin-zoom';
import { Chart } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import { LogsComponent } from './routes/logs/logs.component';

Chart.register(zoomPlugin);

export const DateFormat = {
  parse: {
   dateInput: 'input',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  }
}
@NgModule({
  declarations: [
    AppComponent,
    EditContactComponent,
    EditDetailUserComponent,
    EditUserComponent,
    AddUserComponent,
    AddContactComponent,
    AddFileComponent,
    AlertDeleteFileComponent,
    Page404Component,
    ChartValueComponent,
    
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
    MatMenuModule,
    MatSelectModule,
    MatIconModule,
    MatButtonToggleModule,
    MatStepperModule,
    CdkStepperModule,
    MatTreeModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatSidenavModule,
    MatDatepickerModule,
    MatNativeDateModule,
    SharedPipeModule,
    DropzoneModule,
    ChartsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true, 
    },
     {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true, 
    }, 
    { provide: MAT_DATE_FORMATS, useValue: DateFormat },
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' },

  ],
  entryComponents: [ 
    
    EditContactComponent,
    EditDetailUserComponent,
    EditUserComponent,
    AddUserComponent,
    AddContactComponent,
    AddFileComponent,
    AlertDeleteFileComponent,
    Page404Component,
    ChartValueComponent, 
  ],

  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    registerLocaleData(localeFr, 'fr');
  }
}