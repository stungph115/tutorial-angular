import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login/login.service';
import { UserService } from '../services/user/user.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor (private userService: UserService) {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        let currentUser = this.userService.get();
        if (currentUser && currentUser.access_token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.access_token}`,
                    role : currentUser.role,
                    username: currentUser.username,
                    id: currentUser.id.toString(),
                    firstname: currentUser.firstname,
                    photoProfile: currentUser.photoProfile,
                    
                }
            });// console.log("userRole",currentUser.role)
        }
       // console.log("currenuser",currentUser)
        return next.handle(request);
    }
}