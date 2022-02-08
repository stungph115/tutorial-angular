import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ChartClicked, LogDetail, UserDetail } from '../models/logs';
import { LogsService } from '../services/logs/logs.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-log-detail',
  templateUrl: './log-detail.component.html',
  styleUrls: ['./log-detail.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class LogDetailComponent implements OnInit {
  public logDetail: LogDetail[] = [];
  public userDetail: UserDetail
  displayedColumns: string[] = ["date", "ca", "Event", "id_fiche", "Query", "route", "method"]
  expandedDetail: string[] = [ "date", "ca", "Event", "id_fiche", "Query", "route", "method", "QueryDetail"]

  dataSourceLogDetail = new MatTableDataSource<LogDetail>();
  infoSupp: boolean
  alert: boolean
  image:any
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ChartClicked,
    public dialogRef: MatDialogRef<LogDetailComponent>,
    public dialog: MatDialog,
    private logsService: LogsService,
    
  ) { }

  ngOnInit(): void {
    if(this.data.user == undefined){
      this.infoSupp= true
      this.alert = false
    }else{
      this.infoSupp=false
      this.alert=true
    }
     //get user detail
     this.logsService.getUserDetail(parseInt(this.data.user))
     this.logsService.currentUserDetail.subscribe((userDetail) => {
      if (userDetail != undefined) {
        this.userDetail = userDetail;
        console.log("userDetail", this.userDetail)
      }
    }); 
     //get log detail
     let params={id_user:this.data.user,date: this.data.date, event: this.data.event}
     this.logsService.getLogDetail(params)
       this.logsService.currentLogDetail.subscribe((logDetail) => {
      if (logDetail != undefined) {
        this.logDetail = logDetail;
        console.log(this.logDetail)
      }
      this.dataSourceLogDetail.data=this.logDetail
    });
    
  }
  onNoClick(): void {
    this.dialogRef.close();
   
  }

}
