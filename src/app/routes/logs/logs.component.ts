import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ChartDataset } from 'chart.js';
import { ChartValueComponent } from 'src/app/chart-value/chart-value.component';
import { Log ,UserId} from 'src/app/models/logs';
import { LogsService,  } from 'src/app/services/logs/logs.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {
  public logsChartOptions:any = {
    hoverBorderWidth :11,
    plugins: {
      title: {
          display: true,
          text: 'Graph des activés des utilisateurs',
          font: {size:20,family:"Helvetica Neue"}
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
          text : "Les dates" ,
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
  
  public logsChartLabels:Array<any>
  public logsChartData:Array<any> = [
  {data:[] , label: 'delete'},
  {data:[] , label: 'update'},
  {data:[] , label: 'insert'}
]; 

  public logsChartType:string = 'line';
  public logsChartLegend:boolean = true;
  public myChart: any
  public ctx: any
  
  public logsChartColors:Array<any> = [
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
  public chartClicked(e:any):void {
    console.log("event", e);
   // console.log(e.active[0].index)
    var x_value = this.logsChartLabels[e.active[0].index];
    var y_value_event = e.active[0].element.$context.dataset.label;
    var y_value = e.active[0].element.$context.parsed.y;
   //console.log(x_value);
    //console.log(y_value_role);
   // console.log(y_value);
   // console.log("x type :", typeof(x_value))
   // console.log("y type :", typeof(y_value))
    let data = {x:"Le : "+x_value, y:"User has id: "+this.myFormGroup.value.id_user+" a réalisé "+"<"+ y_value_event+">"+" "+ y_value+" fois"}
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

  myFormGroup: FormGroup;
  public listLog: Log[] = []; 
  public listUser: UserId[] = [];
  constructor(
    public dialog: MatDialog,
    private formbuilder: FormBuilder,
    private logsService: LogsService,
    public datepipe: DatePipe
  ) { }
  today = new Date();
  priorDate = new Date(new Date().setDate(this.today.getDate() - 7));
  ngOnInit(): void {
    this.myFormGroup = this.formbuilder.group({
      id_user: [{ value: null }, Validators.required],
      dateDeb: [{ value: null }, Validators.required],
      dateFin: [{ value: null }, Validators.required]
    });
    this.myFormGroup.setValue({
      id_user: "id_user",
      dateDeb: this.datepipe.transform(this.priorDate,'Y-MM-dd'),
      dateFin: this.datepipe.transform(this.today,'Y-MM-dd')
    });
  
    this.logsService.currentListUser.subscribe((listUser) => {
      if (listUser != undefined) {
        this.listUser = listUser;
      }
    });
    //console.log(this.listUser); 
    this.logsService.getUser()    

    //graph-de-tout
    let dateDeb = this.datepipe.transform(this.myFormGroup.value.dateDeb,'Y-MM-dd')
    let dateFin = this.datepipe.transform(this.myFormGroup.value.dateFin,'Y-MM-dd')
    this.logsChartOptions.plugins.title.text="Graph des activés de tous les utilisateurs"
    let params={id_user:this.myFormGroup.value.id_user, dateDeb:dateDeb, dateFin:dateFin}
    this.logsService.getLog(params )
    this.logsService.currentListLog.subscribe((listLog) => {
      if (listLog != undefined) {
        this.listLog = listLog;
        this.logsChartData = Array() 

        const toNumbers = (arr: any[]) => arr.map(Number);
        this.logsChartLabels =this.listLog.map(x => x.lastdate)
        
        let dataDelete =toNumbers(this.listLog.map(x => x.countDelete))
        let dataUpdate =toNumbers(this.listLog.map(x => x.countUpdate))
        let dataInsert =toNumbers(this.listLog.map(x => x.countInsert))
    
        this.logsChartData.push({data: dataDelete, label:"delete"}) 
        this.logsChartData.push({data: dataUpdate, label:"update"}) 
        this.logsChartData.push({data: dataInsert, label:"insert"}) 
 
      } 
    }); 
  }

  showGraph(){
    let dateDeb = this.datepipe.transform(this.myFormGroup.value.dateDeb,'Y-MM-dd')
    let dateFin = this.datepipe.transform(this.myFormGroup.value.dateFin,'Y-MM-dd')
    //this.logsChartOptions.scales.x.title.text="Les dates entre " + dateDeb +" et "+dateFin //marche pas
    if(this.myFormGroup.value.id_user=="id_user"){
      this.logsChartOptions.plugins.title.text="Graph des activés de tous les utilisateurs"
    }else{
      this.logsChartOptions.plugins.title.text="Graph des activés d'utilisateur qui a l'id: "+this.myFormGroup.value.id_user
    }
     let params={id_user:this.myFormGroup.value.id_user, dateDeb:dateDeb, dateFin:dateFin}
     this.logsService.getLog(params )
     this.logsService.currentListLog.subscribe((listLog) => {
      if (listLog != undefined) {
        this.listLog = listLog;
        this.logsChartData = Array() 
        //console.log("this list log", this.listLog); 
        const toNumbers = (arr: any[]) => arr.map(Number);
        this.logsChartLabels =this.listLog.map(x => x.lastdate)
        
        let dataDelete =toNumbers(this.listLog.map(x => x.countDelete))
        let dataUpdate =toNumbers(this.listLog.map(x => x.countUpdate))
        let dataInsert =toNumbers(this.listLog.map(x => x.countInsert))
    
        this.logsChartData.push({data: dataDelete, label:"delete"}) 
        this.logsChartData.push({data: dataUpdate, label:"update"}) 
        this.logsChartData.push({data: dataInsert, label:"insert"}) 
        //console.log(this.logsChartData)   
      /*Array.prototype.push.apply(this.logsChartData[0].data,dataDelete)
        Array.prototype.push.apply(this.logsChartData[1].data,dataUpdate)
        Array.prototype.push.apply(this.logsChartData[2].data,dataInsert)
      /*   this.logsChartData[1].data.push(dataUpdate)
        this.logsChartData[2].data.push(dataInsert) */ 
        
      } 
    });  
  }
}
