import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user/user.service';
import {Location} from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { EditUserComponent } from 'src/app/edit-user/edit-user.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  public user: User
  public id: string
  currentUserSubscription: Subscription
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private _location: Location,
    public dialog: MatDialog,
    ) {}

  ngOnInit(): void {
    this.currentUserSubscription = this.userService.currentUser.subscribe((user) => {
      if (user != undefined) {
        this.user = user;
      }
    });
    console.log(this.user);
    this.id = this.route.snapshot.paramMap.get('id')
    //console.log(this.id)
    this.userService.getUser(this.id)
  }
  ngOnDestroy() {
    this.currentUserSubscription.unsubscribe();
  }
  back(): void{
    this._location.back();
  }
  selectUser(user: User): void {
    const dialogRef = this.dialog.open(EditUserComponent, {
      data: user,
      width: '1000x',
      height: '250',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      dialogRef.close('Pizza!');
    });
  }
}
