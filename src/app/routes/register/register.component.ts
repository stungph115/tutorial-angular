import { Component, OnInit, Inject } from '@angular/core';
//table-dialog-form
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { UserService } from 'src/app/services/user/user.service'; 
import { User } from 'src/app/models/user'; 
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Md5 } from 'ts-md5/dist/md5';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  myFormGroup: FormGroup;
  public list: User[] = [];
  static list: any;
  constructor(
    private router: Router,
    private formbuilder: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.myFormGroup = this.formbuilder.group({
      username: [{ value: null }, Validators.required],
      password: [{ value: null }, Validators.required],
      name: [{ value: null }, Validators.required],
      firstname: [{ value: null }, Validators.required],
      nationality: [{ value: null }, Validators.required],
      age: [
        { value: null },
        [Validators.required, Validators.pattern(/^\d{2}$/)],
      ],
      sex: [{ value: null }, Validators.required],
      email: [{ value: null }, Validators.required],

    });

    this.myFormGroup.setValue({
      username: null,
      password: null,
      name: null,
      firstname: null,
      nationality: null,
      age: null,
      sex: null,
      email: null,
    });
  }
 

  insertUser(): void {
    console.log('insertUser()');

   
    if (this.myFormGroup.valid) {
      this.myFormGroup.value.password = Md5.hashStr(this.myFormGroup.value.password).toString();
      console.log(this.myFormGroup.value.password)
      this.userService.insertUser(this.myFormGroup.value).then((rest) => {
        if ((rest.status = 200)) {
          console.log('ok');
          this.router.navigate(['/home']);
        } else {
          console.log('pas ok');
        }
      });
    } else {
      console.log('form invalid');
    }
  }

}
