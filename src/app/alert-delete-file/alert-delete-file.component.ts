import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ArchivageExpService } from '../services/archivage-exp/archivage-exp.service';

@Component({
  selector: 'app-alert-delete-file',
  templateUrl: './alert-delete-file.component.html',
  styleUrls: ['./alert-delete-file.component.scss'],
})
export class AlertDeleteFileComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public file: string,
    public dialogRef: MatDialogRef<AlertDeleteFileComponent>,
    private archivageExpService: ArchivageExpService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  deleteFile(file: string): void {
    this.archivageExpService.deleteFile(file).then((res) => {
      if (res.status == 200) {
        console.log('ok');
      } else {
        console.log('Echec de la suprression de contact');
      }
    });
    this.dialogRef.close();
  }
}
