import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng4-charts/ng4-charts';
import { Routes, RouterModule } from '@angular/router';
import { ChartsComponent } from './charts.component';
import { LineComponent } from './line/line.component';
import { BarComponent } from './bar/bar.component';
import { RadarComponent } from './radar/radar.component';
import { PieComponent } from './pie/pie.component';
import { PolarAreaComponent } from './polar-area/polar-area.component';
import { DoughtnutComponent } from './doughtnut/doughtnut.component';
import { MixComponent } from './mix/mix.component';
import { MatDialogModule } from '@angular/material/dialog';
import 'hammerjs';
import 'chartjs-plugin-zoom';
import { Chart } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';

Chart.register(zoomPlugin);

export const chartsRoute: Routes =[
  {
    path:'',
    component: ChartsComponent,
    children: [
      {
        path:'bar', component: BarComponent
      },
      {
        path:'doughtnut', component: DoughtnutComponent
      },
      {
        path:'line', component: LineComponent
      },
      {
        path:'mix', component: MixComponent
      },
      {
        path:'pie', component: PieComponent
      },
      {
        path:'polar-area', component: PolarAreaComponent
      },
      {
        path:'radar', component: RadarComponent
      }
    ]

  }
]

@NgModule({
  declarations: [
    ChartsComponent,
    LineComponent,
    BarComponent,
    RadarComponent,
    PieComponent,
    PolarAreaComponent,
    DoughtnutComponent,
    MixComponent,
  ],
  imports: [
    CommonModule,
    ChartsModule,
    MatDialogModule,
    RouterModule.forChild(chartsRoute)
  ],

  exports:[RouterModule],
})
export class ChartsRoutingModule { }
