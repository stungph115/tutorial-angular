import { Injectable, IterableDiffers } from '@angular/core';
//model
import { User } from 'src/app/models/user';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserService } from '../user/user.service';
import { BehaviorSubject, Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  

  constructor(
    private httpClient: HttpClient,
    private userService :  UserService
    ) {
   
  }



  public async login(params:any) : Promise<any>{
    return new Promise((resolve, reject) => {
      console.log(params)
      this.httpClient
        .post<any>('Http://localhost:3000/login', params)
        .toPromise()
        .then((data) => {
          if (data && data.access_token) {
            localStorage.setItem('currentUser', JSON.stringify(data));
            this.userService.setUser(data);
           }
          resolve(data);
         // console.log("current user",this.currentUser)
        })
    });
  }
  
  
  logout() {
    localStorage.removeItem('currentUser');
    this.userService.setUser(null);
  }

}
