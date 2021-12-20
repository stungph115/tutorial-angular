import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

//service
import { UserService } from 'src/app/services/user/user.service';
import { LoginService } from 'src/app/services/login/login.service';

//model
import { User } from 'src/app/models/user';
//table-dialog-form
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
//user-edit
import { EditUserComponent } from 'src/app/edit-user/edit-user.component';
import { AddUserComponent } from 'src/app/add-user/add-user.component';
import {animate, state, style, transition, trigger} from '@angular/animations';
//form-control
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
 



export class UserComponent implements OnInit {
  myFormGroup: FormGroup;
  disabled = new FormControl(false);
  currentUser: User;
  currentUserSubscription: Subscription;
  
  public list: User[] = [];
  static list: any;
  constructor(
    private userService: UserService,
    private loginService: LoginService,
    private formbuilder: FormBuilder,
    public dialog: MatDialog,
    
  ) {
    
  }
  columnsToDisplay: string[] = [
    'id',
    'name',
    'firstname',
    'nationality',
    'dob',
    'sex',
    'email',
    'tel'

  ];

  expandedDetail: string[] = [
    'id',
    'name',
    'firstname',
    'nationality',
    'dob',
    'sex',
    'email',
    'tel',
    'delete',
    'edit',

  ];



  dataSource = new MatTableDataSource<User>();

  ngOnInit(): void {
    console.log('initing');
    
    this.currentUserSubscription = this.userService.currentList.subscribe((list) => {
      if (list != undefined) {
        this.list = list;
      }
      this.dataSource.data = this.list;
    });
    console.log(this.list);

    this.userService.getList()
  }
  
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentUserSubscription.unsubscribe();
  }


  deleteUser(id: number): void {
    console.log('deleteUser()', id);
    this.userService.deleteUser(id).then((res) => {
      if (res.status == 200) {
        console.log('ok');
      } else {
        console.log("Echec de la suppression de l'utilisateur");
      }
    });
  }

  insertUser(): void {
    console.log('insertUser()');

    if (this.myFormGroup.valid) {
      this.userService.insertUser(this.myFormGroup.value).then((res) => {
        if (res.status == 200) {
          console.log('ok');
        } else {
          console.log('pas ok');
        }
      });
    }
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

  OpenInsertUser(): void {
    const dialogRef = this.dialog.open(AddUserComponent, {

      width: '1000x',
      height: '250',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      dialogRef.close('Pizza!');
    });
  }
}
