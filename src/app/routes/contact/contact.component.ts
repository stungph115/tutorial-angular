import { Component, OnInit } from '@angular/core';
//service
import { ContactService } from 'src/app/services/contact/contact.service';

//model
import { Contact } from 'src/app/models/contact';
//
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

//table-dialog-form
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

//contact-edit
import { EditContactComponent } from 'src/app/edit-contact/edit-contact.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class ContactComponent implements OnInit {
  myFormGroup: FormGroup;

  public list: Contact[] = [];
  static list: any;
  constructor(
    private contactService: ContactService,
    private formbuilder: FormBuilder,
    public dialog: MatDialog
  ) {}

  displayedColumns: string[] = [
    'id',
    'tel',
    'email',
    'adress',
    'zipcode',
    'city',
    'delete',
    'edit',
  ];
  dataSource = new MatTableDataSource<Contact>();

  ngOnInit(): void {
    console.log('inniting');
    this.contactService.currentList.subscribe((list) => {
      if (list != undefined) {
        this.list = list;
      }
      this.dataSource.data = this.list;
    });
    console.log(this.list);

    this.myFormGroup = this.formbuilder.group({
      id: [{ value: null }],
      tel: [{ value: null }, Validators.required],
      email: [{ value: null }, Validators.required],
      adress: [{ value: null }, Validators.required],
      zipcode: [{ value: null }, [Validators.required]],
      city: [{ value: null }, Validators.required],
    });

    this.myFormGroup.setValue({
      id: null,
      tel: null,
      email: null,
      adress: null,
      zipcode: null,
      city: null,
    });

    this.contactService.get()
  }

  deleteContact(id: number): void {
    console.log('deleteContact()', id);
    this.contactService.deleteContact(id).then((res) => {
      if (res.status == 200) {
        console.log('ok');
      } else {
        console.log('Echec de la suprression de contact');
      }
    });
  }

  insertContact(): void {
    console.log('insertContact()');

    if (this.myFormGroup.valid) {
      this.contactService.insertContact(this.myFormGroup.value).then((res) => {
       console.log(res)
        if (res.status == 200) {
          console.log('ok');
        } else {
          console.log('pas ok');
        }
      });
    }
  }

  selectContact(contact: Contact): void {
    const dialogRef = this.dialog.open(EditContactComponent, {
      data: contact,
      width: '1000x',
      height: '250',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      dialogRef.close('Pizza!');
    });
  }
}
