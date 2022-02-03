import { LogsComponent } from "./logs.component";
import { Routes, RouterModule } from '@angular/router';
import { ChartsModule } from 'ng4-charts/ng4-charts';
import { CommonModule, registerLocaleData } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { NgModule } from "@angular/core";
import {MatSelectModule} from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {MatButtonModule} from '@angular/material/button';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from "@angular/material/core";
import { DateFormat } from "src/app/app.module";
import localeFr from '@angular/common/locales/fr';
import { DatePipe } from '@angular/common';

export const logsRoute: Routes =[
    {
        path: '',
        component: LogsComponent,
    }
];

@NgModule({
    declarations: [LogsComponent],
    entryComponents:[LogsComponent],
    imports: [
        CommonModule,
        ChartsModule,
        MatDialogModule,
        MatButtonModule,
        MatSelectModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatDatepickerModule,
        
        RouterModule.forChild(logsRoute)
    ],
    providers: [    
        { provide: MAT_DATE_FORMATS, useValue: DateFormat },
        { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' },
        DatePipe,
        
      ],
    exports: [RouterModule]
})
export class LogsRoutingModule {
    constructor() {
        registerLocaleData(localeFr, 'fr');
    }
}