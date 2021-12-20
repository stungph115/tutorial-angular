import { Component, OnInit, Inject } from '@angular/core';
//Service
import { DetailUserService } from '../services/detailuser/detailuser.service';
//table-dialog-form
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DetailUser } from '../models/detailuser';


@Component({
  selector: 'app-edit-detail-user',
  templateUrl: './edit-detail-user.component.html',
  styleUrls: ['./edit-detail-user.component.scss']
})
export class EditDetailUserComponent implements OnInit {
  myFormGroup: FormGroup

  constructor(
    
    @Inject(MAT_DIALOG_DATA) public data: DetailUser, 
    
    public dialogRef: MatDialogRef<EditDetailUserComponent>,
    private formbuilder: FormBuilder,
    public dialog: MatDialog,
    private detailUserService: DetailUserService
  ) { }

  ngOnInit(): void {
    console.log(this.data)
    this.myFormGroup=this.formbuilder.group
    ({
      name:[{value:null},Validators.required],
      firstname:[{value:null},Validators.required],
      nationality:[{value:null},Validators.required],
      age:[{value:null},Validators.required],   
      sex:[{value:null},Validators.required]  
    })

    this.myFormGroup.setValue
    ({name:this.data.name,
      firstname:this.data.firstname,
      nationality:this.data.nationality,
      age:this.data.age,
      sex:this.data.sex
    })
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  updateDetailUser(): void 
  { 
    this.detailUserService.updateDetailUser(this.myFormGroup.value)
    console.log("updateDetailUser()")    
    this.dialogRef.close();
  }

}
