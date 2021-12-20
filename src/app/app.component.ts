import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './services/user/user.service'; 
import { User } from './models/user';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginService } from './services/login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public  title: string = 'This is my first tuto';
  showFiller = false;
  currentUser: User;
  constructor(
    private router: Router,
    private userService: UserService,
    private loginService: LoginService,
    public dialog: MatDialog,

  ) {
  }
  ngOnInit() {
    console.log('appinit')
    
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

}
