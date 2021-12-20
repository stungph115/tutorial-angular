import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { File } from '../models/file';
import { DropzoneComponent, DropzoneConfigInterface, DropzoneDirective } from 'ngx-dropzone-wrapper';
import { UserService } from '../services/user/user.service';
import { User } from '../models/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-file',
  templateUrl: './add-file.component.html',
  styleUrls: ['./add-file.component.scss']
})
export class AddFileComponent implements OnInit {
  @ViewChild(DropzoneComponent) drpzone: DropzoneComponent;

  public currentUser: User=<User>{};
  currentUserSubscription: Subscription;

  fileFormGroup: FormGroup
  public config: DropzoneConfigInterface = {  
    clickable: true,
    maxFiles: 10,
    autoProcessQueue: false,
    url: 'http://localhost:3000/upload-exp/',
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: File,
    public dialogRef: MatDialogRef<AddFileComponent>,
    private formbuilder: FormBuilder,
    public dialog: MatDialog,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    //currentUser
    this.currentUserSubscription = this.userService.currentList.subscribe()
    this.currentUser = this.userService.get()
    this.config.headers ={Authorization: `Bearer ${this.currentUser.access_token}`,}
    
    //form
    this.fileFormGroup = this.formbuilder.group({
      file: [{ value: null }, Validators.required],
      ca: [{ value: null }, Validators.required],
      title: [{ value: null }, Validators.required],

    })
    this.fileFormGroup.setValue({
      file:null,
      ca:null,
      title:null,
    })
  }

  ngOnDestroy() {
    this.currentUserSubscription.unsubscribe();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  sendFile(): void{
    this.drpzone.directiveRef.dropzone().processQueue();
    
    window.location.reload();
  }
  onSending(data): void {
    const file = data[0];
    const FormData = data[2];
    if(file)
    {
      FormData.append('file_name', this.fileFormGroup.value.file);
      FormData.append('ca', this.fileFormGroup.value.ca);
      FormData.append('title', this.fileFormGroup.value.title);
      FormData.append('username', this.currentUser.username);
      data[2] = FormData
    }
   // console.log("data", FormData)
  }
}
