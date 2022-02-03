import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BaseChartDirective } from 'ng4-charts/ng4-charts';
import { ChartsModule } from 'ng4-charts/ng4-charts';
import { ChartValueComponent } from 'src/app/chart-value/chart-value.component';
import 'hammerjs';
import zoomPlugin from 'chartjs-plugin-zoom';
import { Chart } from 'chart.js';
Chart.register(zoomPlugin);

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.scss']
})
export class LineComponent implements OnInit {

  public lineChartData:Array<any> = [
    {data: [65 , 59, 80, 81, 56, 55, 40], label: 'Admin'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'User'},
    {data: [18, 48, 77, 9, 100, 27, 40], label: 'Visitor'}
  ];
  public lineChartLabels:Array<any> = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet'];
  
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';

  
  // events
  public chartClicked(e:any):void {
     //console.log("event", e);
   // console.log(e.active[0].index)
   var x_value = this.lineChartLabels[e.active[0].index];
   var y_value_role = e.active[0].element.$context.dataset.label;
   var y_value = e.active[0].element.$context.parsed.y;
  //console.log(x_value);
   //console.log(y_value_role);
  // console.log(y_value);
  // console.log("x type :", typeof(x_value))
  // console.log("y type :", typeof(y_value))
   let data = {x:" Le mois : " + x_value , y: "Role : " + y_value_role + " a visité " + y_value + " fois"}
   const dialogRef = this.dialog.open(ChartValueComponent, {
     data: data,
     width: '1000x',
     height: '250',
   });

   dialogRef.afterClosed().subscribe((result) => {
     console.log('The dialog was closed');
     dialogRef.close('Pizza!');
   });
  }

  public chartHovered(e:any):void {
    console.log(e);

  }

  constructor(
    public dialog: MatDialog,

  ) { }
  public lineChartOptions:any = {
    hoverBorderWidth :11,
    animations: {
      tension: {
        duration: 1000,
        easing: 'linear',
        from: 1,
        to: 0,
        loop: true
      }
    },
    plugins: {
      title: {
          display: true,
          text: 'Line Chart example',
      },
      pan: {
        enabled: true,
        mode: 'xy',
      },
      zoom: {
        enabled: true,
        mode: 'xy',
       
      },
    },
    scales:{
      x:{
        title:{
          display : true,
          text : "Les mois",
          color: "#b06400",
          
          font: {
            size: 16,
            family: "Helvetica Neue",
          }
        }
      },
      y:{
        title:{
          display : true,
          text : "Nombre de fois",
          color: "#b06400",
          font: {
            size: 16,
            family: "Helvetica Neue",
            
          }
        }
      },
    }
  };
  ngOnInit(): void {
    console.log(typeof(this.lineChartData[0].data))
    console.log("thisdata", this.lineChartData)

  }

}
