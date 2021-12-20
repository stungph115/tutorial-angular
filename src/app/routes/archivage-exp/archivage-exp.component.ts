import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { Subscription } from 'rxjs';
import { AddFileComponent } from 'src/app/add-file/add-file.component';
import { File } from 'src/app/models/file';
import { User } from 'src/app/models/user';
import { ArchivageExpService } from 'src/app/services/archivage-exp/archivage-exp.service';
import { UserService } from 'src/app/services/user/user.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AlertDeleteFileComponent } from 'src/app/alert-delete-file/alert-delete-file.component';
import * as fileSaver from 'file-saver';

@Component({
  selector: 'app-archivage-exp',
  templateUrl: './archivage-exp.component.html',
  styleUrls: ['./archivage-exp.component.scss'],
})
export class ArchivageExpComponent implements OnInit {
  currentUserSubscription: Subscription;
  public currentUser: User = <User>{};

  /* public config: DropzoneConfigInterface = {
    clickable: true,
    maxFiles: 10,
    autoProcessQueue: false,
  }; */
  public list: File[] = [];
  static list: any;
  constructor(
    private archivageExpService: ArchivageExpService,
    private userService: UserService,
    public dialog: MatDialog
  ) {}
  displayedColumns: string[] = [
    'num',
    'file',
    'ca',
    'username',
    'date',
    'title',
    'delete',
    'viewFile',
    'downloadFile',
  ];
  dataSource = new MatTableDataSource<File>();

  ngOnInit(): void {
    this.currentUserSubscription = this.userService.currentList.subscribe();
    this.currentUser = this.userService.get();
    /*     this.config.headers ={Authorization: `Bearer ${this.currentUser.access_token}`,}
     */
    this.archivageExpService.currentList.subscribe((list) => {
      if (list != undefined) {
        this.list = list;
      }
      this.dataSource.data = this.list;
    });
    console.log('listFile', this.list);
    console.log(this.currentUser.id);

    this.archivageExpService.get();
  }

  OpenAddFile(): void {
    const dialogRef = this.dialog.open(AddFileComponent, {
      width: '1000x',
      height: '250',
    });

    dialogRef.afterClosed().subscribe((result) => {
      dialogRef.close('Pizza!');
    });
  }

  OpenDeleteAlert(file: string): void {
    const dialogRef = this.dialog.open(AlertDeleteFileComponent, {
      width: '1000x',
      height: '250',
      data: file,
    });

    dialogRef.afterClosed().subscribe((res) => {
      dialogRef.close();
     // window.location.reload();
    });
  }

  openFile(file: string): void {
    // console.log("open")

    this.archivageExpService.openFile(file).subscribe((response: any) => {
      //console.log("reponse", response)
      let blob: any = new Blob([response], { type: response.type });
      const url = window.URL.createObjectURL(blob);

      let tab = window.open();
      tab.location.href = url;
    });
  }

  downloadFile(file: string): void {
    // console.log("download")

    this.archivageExpService.openFile(file).subscribe((response: any) => {
      let blob: any = new Blob([response]);
      const url = window.URL.createObjectURL(blob);

      fileSaver.saveAs(blob, file);
    });
  }
}
