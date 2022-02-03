import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChartValueComponent } from 'src/app/chart-value/chart-value.component';

@Component({
  selector: 'app-polar-area',
  templateUrl: './polar-area.component.html',
  styleUrls: ['./polar-area.component.scss']
})
export class PolarAreaComponent implements OnInit {
   // PolarArea
   public polarAreaChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales', 'Telesales', 'Corporate Sales'];
   public polarAreaChartData:number[] = [300, 500, 100, 200, 40];
   public polarAreaLegend:boolean = true;
   public polarAreaOptions : any ={
    hoverOffset :50,

   }
   public polarAreaChartType:string = 'polarArea';
 
   // events
   public chartClicked(e:any):void {
    console.log(e);
    console.log(e.active[0].index)
    var x_value = this.polarAreaChartLabels[e.active[0].index];
    var y_value = this.polarAreaChartData[e.active[0].index];
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
