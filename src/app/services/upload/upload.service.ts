import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { rejects } from 'assert';
import { BehaviorSubject, Observable } from 'rxjs';
import { File } from 'src/app/models/file';
@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private list: File[] = [];
  private currentListSubject: BehaviorSubject<File[]>;
  public currentList: Observable<File[]>;
  data: File[];
  constructor(private httpClient: HttpClient) {
    this.currentListSubject = new BehaviorSubject<File[]>(this.list);
    this.currentList = this.currentListSubject.asObservable();
   }
   
   public set(list: any): void {
    this.currentListSubject.next(list);
    console.log("current list", this.currentListSubject)
  }

   public get(): Promise<any> {
     return new Promise((resolve, rejects) =>{
      this.httpClient
        .get('Http://localhost:3000/upload')
        .toPromise()
        .then((list)=>{
          this.set(list);
          console.log("List",list)
        });
     });
   }

   public openFile(fileName: string){
     
     // console.log("service.openning")
      //console.log(fileName)
     
      return this.httpClient
        .get('Http://localhost:3000/upload/' + fileName, {responseType: 'blob'})
       
    };   
}
