import { Component, OnInit } from '@angular/core';

//service
import { DetailUserService } from 'src/app/services/detailuser/detailuser.service'; 

//model
import { DetailUser } from 'src/app/models/detailuser';
//tablea-dialog-form
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

//edit-detailUser
import { EditDetailUserComponent } from 'src/app/edit-detail-user/edit-detail-user.component';

@Component({
  selector: 'app-detailuser',
  templateUrl: './detailuser.component.html',
  styleUrls: ['./detailuser.component.scss']
})
export class DetailuserComponent implements OnInit {
  myFormGroup: FormGroup

  public list: DetailUser[]=[]
  constructor(
    private detailuserService: DetailUserService,
    private formbuilder: FormBuilder,
    public diaglog: MatDialog
  ) {  }
  displayedColumns: string[] = ['name', 'firstname', 'nationality', 'age', 'sex','edit', 'delete']
 dataSource = new MatTableDataSource<DetailUser>();
  ngOnInit(): void 
  {
    this.detailuserService.currentList.subscribe(list=>{
      if(list != undefined){ this.list=list;}
      this.dataSource.data = this.list;
    })

    this.myFormGroup=this.formbuilder.group
    ({
      name:[{value:null},Validators.required],
      firstname:[{value:null},Validators.required],
      nationality:[{value:null},Validators.required],
      age:[{value:null},Validators.required],
      sex:[{value:null},Validators.required]
    })
    this.myFormGroup.setValue
    ({
      name:null,
      firstname:null,
      nationality:null,
      age:null,
      sex:null
    })
  
  }


  deleteDetailUser(name: string): void
  {
    console.log("deleteDetailUser()", name)
   this.detailuserService.deleteDetailUser(name)
  }

  insertDetailUser(): void
  {
    console.log("insertDetailUser()")
    
    if(this.myFormGroup.valid)
    {
      this.detailuserService.insertDetailUser(this.myFormGroup.value.name,
                                              this.myFormGroup.value.firstname, 
                                              this.myFormGroup.value.nationality,
                                              this.myFormGroup.value.age, 
                                              this.myFormGroup.value.sex);
    }
  }



  public submit(): void{
    console.log(this.myFormGroup.value)
    if(this.myFormGroup.valid){
      console.log("form is valid")
      
    }else{
      console.log("form is not valid")
    }
  }

  selectDetailUser(detailuser: DetailUser): void 
  {
    const dialogRef = this.diaglog.open(EditDetailUserComponent,{data: detailuser, width: '1000x', height:'250'});

    dialogRef.afterClosed().subscribe((result) =>
    {
      console.log('The dialog was closed');
      dialogRef.close('Pizza!');
    });
  }



}
