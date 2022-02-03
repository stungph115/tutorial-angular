import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Chart } from '../models/chart';

@Component({
  selector: 'app-chart-value',
  templateUrl: './chart-value.component.html',
  styleUrls: ['./chart-value.component.scss']
})
export class ChartValueComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Chart,
    public dialogRef: MatDialogRef<ChartValueComponent>,
    public dialog: MatDialog,


  ) { }

  ngOnInit(): void {
    console.log(this.data);
    
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
