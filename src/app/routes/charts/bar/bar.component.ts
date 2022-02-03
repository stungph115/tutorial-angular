import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChartValueComponent } from 'src/app/chart-value/chart-value.component';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss']
})
export class BarComponent implements OnInit {
  public barChartOptions:any = {
    hoverBorderWidth: 5,
    responsive: true,
    
  };
  public barChartLabels:string[] = ['17~20 ans', '20~30 ans', '30~40 ans', '40~50 ans', '50~60 ans', '60~  ans'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;

  public barChartData:any[] = [
    {data: [65, 59, 80, 81, 56, 55,], label: 'Admin'},
    {data: [28, 48, 40, 19, 86, 27, ], label: 'User'}
  ];

  // events
  public chartClicked(e:any):void {
    //console.log("event", e);
   // console.log(e.active[0].index)
    var x_value = this.barChartLabels[e.active[0].index];
    var y_value_role = e.active[0].element.$context.dataset.label;
    var y_value = e.active[0].element.$context.parsed.y;
   //console.log(x_value);
    //console.log(y_value_role);
   // console.log(y_value);
   // console.log("x type :", typeof(x_value))
   // console.log("y type :", typeof(y_value))
    let data = {x:"Trache d'age : " + x_value , y: "Role : " + y_value_role + " a visité " + y_value + " fois"}
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
    console.log(this.barChartData)
  }

}
