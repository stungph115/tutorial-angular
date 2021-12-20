import { Component, OnInit, Inject } from '@angular/core';
//table-dialog-form
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { UserService } from '../services/user/user.service';
import { User } from '../models/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Md5 } from 'ts-md5/dist/md5';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  myFormGroup: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: User,

    public dialogRef: MatDialogRef<AddUserComponent>,
    private formbuilder: FormBuilder,
    public dialog: MatDialog,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    this.myFormGroup = this.formbuilder.group({
      username: [{ value: null }, Validators.required],
      password: [{ value: null }, Validators.required],
      name: [{ value: null }, Validators.required],
      firstname: [{ value: null }, Validators.required],
      nationality: [{ value: null }, Validators.required],
      dob: [{ value: null },Validators.required],
      sex: [{ value: null }, Validators.required],
      tel: [{ value: null }, Validators.required],
    });

    this.myFormGroup.setValue({
      username: null,
      password: null,
      name: null,
      firstname: null,
      nationality: null,
      dob: null,
      sex: null,
      tel: null,
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  insertUser(): void {
    console.log('insertUser()');

   
    if (this.myFormGroup.valid) {
      this.myFormGroup.value.password = Md5.hashStr(this.myFormGroup.value.password).toString();
      console.log(this.myFormGroup.value.password)
      this.userService.insertUser(this.myFormGroup.value).then((rest) => {
        if ((rest.status = 200)) {
          console.log('ok');
          this.dialogRef.close();
        } else {
          console.log('pas ok');
        }
      });
    } else {
      console.log('form invalid');
    }
  }

}
