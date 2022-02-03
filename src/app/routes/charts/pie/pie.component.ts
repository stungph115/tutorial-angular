import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChartValueComponent } from 'src/app/chart-value/chart-value.component';

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss']
})
export class PieComponent implements OnInit {
  // Pie
  public pieChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
  public pieChartData:number[] = [300, 500, 100];
  public pieChartType:string = 'pie';
  public pieChartOptions:any ={
    hoverOffset :20,
  }
  // events
  public chartClicked(e:any):void {
    console.log(e);
    console.log(e.active[0].index)
    var x_value = this.pieChartLabels[e.active[0].index];
    var y_value = this.pieChartData[e.active[0].index];
    console.log(x_value);
    console.log(typeof(x_value))
    console.log(typeof(y_value))
    let data = {x: x_value,y: "Values : " + y_value}
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
