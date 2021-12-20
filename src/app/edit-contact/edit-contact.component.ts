//component, OnInite, Inject
import { Component, OnInit, Inject } from '@angular/core';
//table-dialog-form
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
//service
import { ContactService } from '../services/contact/contact.service';
//model
import { Contact } from '../models/contact';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.scss'],
})
export class EditContactComponent implements OnInit {
  myFormGroup: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Contact,

    public dialogRef: MatDialogRef<EditContactComponent>,
    private formbuilder: FormBuilder,
    public dialog: MatDialog,
    private contactService: ContactService
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    this.myFormGroup = this.formbuilder.group({
      id: [{ value: null }, Validators.required],
      tel: [{ value: null }, Validators.required],
      email: [{ value: null }, Validators.required],
      adress: [{ value: null }, Validators.required],
      zipcode: [
        { value: null },
        [Validators.required, Validators.pattern(/^\d{5}$/)],
      ],
      city: [{ value: null }, Validators.required],
    });

    this.myFormGroup.setValue({
      id: this.data.id,
      tel: this.data.tel,
      email: this.data.email,
      adress: this.data.adress,
      zipcode: this.data.zipcode,
      city: this.data.city,
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  updateContact(): void {
    console.log('updateContact(');
    if (this.myFormGroup.valid) {
      this.contactService.updateContact(this.myFormGroup.value).then((rest) => {
        if ((rest.status == 200)) {
          console.log('ok');
          this.dialogRef.close();
        } else {
          console.log('pas ok');
        }
      });
    } else {
      console.log('from invalid');
    }
  }
}
