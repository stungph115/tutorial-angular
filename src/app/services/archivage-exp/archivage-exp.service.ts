import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { File } from 'src/app/models/file';

@Injectable({
  providedIn: 'root',
})
export class ArchivageExpService {
  private list: File[] = [];
  private currentListSubject: BehaviorSubject<File[]>;
  public currentList: Observable<File[]>;
  data: File[];
  constructor(private httpClient: HttpClient) {
    this.currentListSubject = new BehaviorSubject<File[]>(this.list);
    this.currentList = this.currentListSubject.asObservable();
  }
  public get(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient
        .get('Http://localhost:3000/upload-exp')
        .toPromise()
        .then((list) => {
          this.set(list);
        });
    });
  }
  public set(list: any): void {
    this.currentListSubject.next(list);
  }
  public deleteFile(file: string): Promise<any> {
    //console.log("service delete", file)
    return new Promise((resolve, reject) => {
      this.httpClient
        .get('Http://localhost:3000/upload-exp/delete/' + file)
        .toPromise()
        .then(
          (list) => {
            resolve({ status: 200 });
            this.set(list);
          },
          (msg) => {
            resolve(msg);
          }
        )
        .catch((err) => {
          reject(err);
        });
    });
  }
  public openFile(fileName: string) {
    // console.log("service.openning")
    //console.log(fileName)

    return this.httpClient.get('Http://localhost:3000/upload-exp/' + fileName, {
      responseType: 'blob',
    });
  }
}
