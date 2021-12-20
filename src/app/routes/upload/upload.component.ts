import { Component, OnInit, ViewChild } from '@angular/core';
import { DropzoneComponent , DropzoneDirective,
  DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { UploadService } from 'src/app/services/upload/upload.service';
import { File } from 'src/app/models/file';
import { MatTableDataSource } from '@angular/material/table';
import * as fileSaver from 'file-saver';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  //config dropzone
  public config: DropzoneConfigInterface = {
    clickable: true,
    maxFiles: 10,
    autoReset: null,
    errorReset: null,
  };

  //list
  public list: File[] = [];
  static list: any;
  constructor(
    private uploadService : UploadService
  ) { }
  displayedColumns: string [] =[
    'name',
    'type',
    'viewFile',
   'downloadFile'     
  ]
  dataSource=new MatTableDataSource<File>();


 
  ngOnInit(): void {
    console.log('initing');

    this.uploadService.currentList.subscribe((list) => {
      if (list != undefined) {
        this.list = list;
      }
      this.dataSource.data = this.list;
    });
    console.log("listFile", this.list);

  this.uploadService.get();
  }

 // public resetUpload(): void {}
  
 openFile(name: string): void{
  // console.log("open")
   
   this.uploadService.openFile(name).subscribe((response: any)=>{
    //console.log("reponse", response)
    let blob:any = new Blob([response], { type: response.type  });
    const url = window.URL.createObjectURL(blob);

    let tab = window.open();
    tab.location.href = url;
   });
   
 }
  downloadFile(name: string): void{
   // console.log("download")
    
    this.uploadService.openFile(name).subscribe((response: any)=>{

    let blob:any = new Blob([response]);
    const url = window.URL.createObjectURL(blob);

    fileSaver.saveAs(blob, name);
    });
  
  } 
   
}

