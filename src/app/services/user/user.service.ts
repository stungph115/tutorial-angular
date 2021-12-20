import { Injectable, IterableDiffers } from '@angular/core';
//model
import { User } from 'src/app/models/user';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';
import { rejects } from 'assert';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private list: User[] = [];
  private currentListSubject: BehaviorSubject<User[]>;
  public currentList: Observable<User[]>;


  private currentuserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private user: User ;
  data: User[];

  constructor(private httpClient: HttpClient) {

    //List
    this.currentListSubject = new BehaviorSubject<User[]>(this.list);
    this.currentList = this.currentListSubject.asObservable();
    //user
    this.currentuserSubject=new BehaviorSubject<User>(this.user)
    this.currentUser =this.currentuserSubject.asObservable();
  }

  //public
  public get(): User{
    if(this.user){
      console.log("here", this.user)
      return this.user

    }else{
      let user = localStorage.getItem('currentUser')
      console.log("get()",user)
      if(user){
        this.setUser(JSON.parse(user))
        return JSON.parse(user)
      }
    }
  }
  public getList(): Promise<any> {
    return new Promise((resolve, reject) => {
      console.log("get users")
      this.httpClient
        .get('Http://localhost:3000/user')
        .toPromise()
        .then((list) => {
          this.set(list);
          console.log("list user", this.list)
        });
    });
  }

  public getInfo(username: string): Promise<any> {
    console.log("service info",username)
    return new Promise((resolve, reject) => {
      this.httpClient
        .get('Http://localhost:3000/user/info/' + username)
        .toPromise()
        .then((thisuser) => {
          resolve(thisuser);
          console.log("this user", thisuser)
        });
    });
  }
  public async deleteUser(userId: number): Promise<any> {
    console.log('UserService.deleteUser');
    return new Promise((resolve, reject) => {
      console.log(typeof userId);
      this.httpClient
        .get('http://localhost:3000/user/delete/' + userId)
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

  public async insertUser(user: User): Promise<any> {
    console.log('UserService.insertUSer');
    return new Promise((resolve, reject) => {
      this.httpClient
        .post<any>('Http://localhost:3000/user/insert', user)
        .toPromise()
        .then((list) => {
          console.log("list", list);
          resolve({ status: 200 });
          this.set(list);
        });
    });
  }

  public set(list: any): void {
    this.currentListSubject.next(list);

   }

  public setUser(user: any): void {
    this.currentuserSubject.next(user);
    this.user = user
  }

  public async updateUser(params: User): Promise<any> {
    console.log('UserService.updateUser');
    return new Promise((resolve, reject) => {
      this.httpClient
        .post<any>('Http://localhost:3000/user/update', params)
        .toPromise()
        .then((list) => {
          console.log(list);
          resolve({ status: 200 });
          this.set(list);
        });
    });
  }
 
}
