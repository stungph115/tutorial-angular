import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChartValueComponent } from 'src/app/chart-value/chart-value.component';

@Component({
  selector: 'app-radar',
  templateUrl: './radar.component.html',
  styleUrls: ['./radar.component.scss']
})
export class RadarComponent implements OnInit {
 // Radar
 public radarChartLabels:string[] = [ 'Update',  'Delete', 'Insert'];

 public radarChartData:any = [
   {data: [65, 59, 90], label: 'Admin'},
   {data: [28, 48, 40], label: 'User'}
 ];
 public radarChartType:string = 'radar';
public radarChartOptions: any ={
  hoverBorderWidth :11,
/*   animations: {
    tension: {
      duration: 1000,
      easing: 'linear',
      from: 2,
      to: 1,
      loop: true
    }
  }, */
}
 // events
 public chartClicked(e:any):void {
  //console.log("event", e);
   // console.log(e.active[0].index)
  
   var x_value = this.radarChartLabels[e.active[0].index];
   var y_value_role = e.active[0].element.$context.dataset.label;
   var y_value = e.active[0].element.$context.raw;
  //console.log(x_value);
   //console.log(y_value_role);
  console.log(y_value);
  // console.log("x type :", typeof(x_value))
  // console.log("y type :", typeof(y_value))
   let data = {x:"Activité : " + x_value , y: "Role : " + y_value_role + " a rélisé " + y_value + " fois"}
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

  ngOnInit(): void {
  }

}
