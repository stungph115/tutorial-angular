import { Component, OnInit, Inject } from '@angular/core';
//table-dialog-form
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
//service
import { UserService } from '../services/user/user.service';
//model
import { User } from '../models/user';
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  myFormGroup: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: User,

    public dialogRef: MatDialogRef<EditUserComponent>,
    private formbuilder: FormBuilder,
    public dialog: MatDialog,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    this.myFormGroup = this.formbuilder.group({
      id: [{ value: null }, Validators.required],
      name: [{ value: null }, Validators.required],
      firstname: [{ value: null }, Validators.required],
      nationality: [{ value: null }, Validators.required],
      dob: [{ value: null },Validators.required],
      sex: [{ value: null }, Validators.required],
      email: [{ value: null }, Validators.required],
      tel: [{ value: null }, Validators.required],

    });

    this.myFormGroup.setValue({
      id: this.data.id,
      name: this.data.name,
      firstname: this.data.firstname,
      nationality: this.data.nationality,
      dob: this.data.dob,
      sex: this.data.sex,
      email: this.data.email,
      tel: this.data.tel,

    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  updateUser(): void {
    console.log('updateUser()');
    if (this.myFormGroup.valid) {
      this.userService.updateUser(this.myFormGroup.value).then((rest) => {
        if (rest.status == 200) {
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
