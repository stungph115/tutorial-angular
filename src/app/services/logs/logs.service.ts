import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Log,LogDetail,UserDetail,UserId } from 'src/app/models/logs';
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
  //logDetail
  private logDetail: LogDetail[] = [];
  private currentLogDetailSubject: BehaviorSubject<LogDetail[]>;
  public currentLogDetail: Observable<LogDetail[]>;
  //userDetail
  private userDetail: UserDetail;
  private currentUserDetailSubject: BehaviorSubject<UserDetail>;
  public currentUserDetail: Observable<UserDetail>;

  constructor(private httpClient: HttpClient) {
    //log
    this.currentListLogSubject = new BehaviorSubject<Log[]>(this.listLog);
    this.currentListLog = this.currentListLogSubject.asObservable();  
    //user
    this.currentListUserSubject = new BehaviorSubject<UserId[]>(this.listUser);
    this.currentListUser = this.currentListUserSubject.asObservable();
    //logDetail
    this.currentLogDetailSubject = new BehaviorSubject<LogDetail[]>(this.logDetail);
    this.currentLogDetail = this.currentLogDetailSubject.asObservable();
    //userDetail
    this.currentUserDetailSubject = new BehaviorSubject<UserDetail>(this.userDetail);
    this.currentUserDetail = this.currentUserDetailSubject.asObservable();
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

    //log-detail
      public getLogDetail(params:any): Promise<any>{
        return new Promise((resolve, rejects)=>{
          this.httpClient.post<any>('Http://localhost:3000/log/detail-log/', params )
          .toPromise()
          .then((logDetail)=>{
            this.setLogDetail(logDetail)
          })
        })
      }
      
      public setLogDetail(logDetail:any):void{
        this.currentLogDetailSubject.next(logDetail)
      }

      //user-detail
      public getUserDetail(id_com:number|string): Promise<any>{
        return new Promise((resolve, rejects)=>{
          this.httpClient.get('Http://localhost:3000/log/detail-user/'+ id_com )
          .toPromise()
          .then((userDetail)=>{
            this.setUserDetail(userDetail)
          })
        })
      }
      
      public setUserDetail(userDetail:any):void{
        this.currentUserDetailSubject.next(userDetail)
      }
}
