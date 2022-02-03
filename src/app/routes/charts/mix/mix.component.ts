import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChartValueComponent } from 'src/app/chart-value/chart-value.component';

@Component({
  selector: 'app-mix',
  templateUrl: './mix.component.html',
  styleUrls: ['./mix.component.scss']
})
export class MixComponent implements OnInit {
   // lineChart
   public chart = {
    "datasets": [
      { "data": [ 30, 20, 40, 35, 45, 33, 80], "label": "Admin" },
      { "data": [ 50, 60, 55, 59, 30, 40, 55], "label": "User" },
      { "data": [ 15, 45, 35, 75, 60, 100, 20, 12], "label": "Visitor", "type": "line" }
    ],
    "labels": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", ],
    "options": {
      "legend": {
        "display": true,
      },

    }
  };



  public chartClicked(e:any):void {
//console.log("event", e);
   // console.log(e.active[0].index)
   var x_value = this.chart.labels[e.active[0].index];
   var y_value_role = e.active[0].element.$context.dataset.label;
   var y_value = e.active[0].element.$context.parsed.y;
  //console.log(x_value);
   //console.log(y_value_role);
  // console.log(y_value);
  // console.log("x type :", typeof(x_value))
  // console.log("y type :", typeof(y_value))
   let data = {x:"Jours de la semaine : " + x_value , y: "Role : " + y_value_role + " a visité " + y_value + " fois"}
   const dialogRef = this.dialog.open(ChartValueComponent, {
     data: data,
     width: '1000x',
     height: '250',
   });

   dialogRef.afterClosed().subscribe((result) => {
     console.log('The dialog was closed');
     dialogRef.close('Pizza!');
   });  }

  public chartHovered(e:any):void {
    console.log(e);
  }
  constructor(
    public dialog: MatDialog,

  ) { }

  ngOnInit(): void {
  }

}
