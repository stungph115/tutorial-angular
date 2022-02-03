import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Log,UserId } from 'src/app/models/logs';
import { NumberValueAccessor } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})



export class LogsService {
  //log
  private listLog: Log[] = [];
  private currentListLogSubject: BehaviorSubject<Log[]>;
  public currentListLog: Observable<Log[]>;  
  //user  
  private listUser: UserId[] = [];
  private currentListUserSubject: BehaviorSubject<UserId[]>;
  public currentListUser: Observable<UserId[]>;
  

  constructor(private httpClient: HttpClient) {
    //log
    this.currentListLogSubject = new BehaviorSubject<Log[]>(this.listLog);
    this.currentListLog = this.currentListLogSubject.asObservable();  

    //user
    this.currentListUserSubject = new BehaviorSubject<UserId[]>(this.listUser);
    this.currentListUser = this.currentListUserSubject.asObservable();
   }

  //user
    public getUser(): Promise<any> {
      return new Promise((resolve, rejects) => {
        this.httpClient
          .get('http://localhost:3000/log/getUser')
          .toPromise()
          .then((listUser) => {
            this.setUser(listUser);
           // console.log(listUser)
          });
      });
    }
    public setUser(listUser: any): void {
      this.currentListUserSubject.next(listUser);
    }

  //log
     public getLog(params:any): Promise<any> {
       //console.log("service getLog" , id_user)
      return new Promise((resolve, rejects) => {
        this.httpClient
          .post<any>('Http://localhost:3000/log/list/', params )
          .toPromise()
          .then((listLog) => {
            this.setLog(listLog);
            //console.log(listLog)
          });
      });
    }

    public setLog(listLog: any): void {
      this.currentListLogSubject.next(listLog);
    } 

  
}
