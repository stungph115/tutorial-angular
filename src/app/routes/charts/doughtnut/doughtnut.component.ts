import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChartValueComponent } from 'src/app/chart-value/chart-value.component';

@Component({
  selector: 'app-doughtnut',
  templateUrl: './doughtnut.component.html',
  styleUrls: ['./doughtnut.component.scss']
})
export class DoughtnutComponent implements OnInit {
  public doughnutChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public doughnutChartData:number[] = [350, 450, 100];
  public doughnutChartType:string = 'doughnut';
  public doughnutChartOptions: any ={
    hoverOffset :20,

  }

  // events
  public chartClicked(e:any):void {
    console.log(e);
    console.log(e.active[0].index)
    var x_value = this.doughnutChartLabels[e.active[0].index];
    var y_value = this.doughnutChartData[e.active[0].index];
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
