import { Injectable } from '@angular/core';
//model
import { DetailUser } from 'src/app/models/detailuser';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetailUserService {
  private list: DetailUser[]=[]
  private currentListSubject: BehaviorSubject<DetailUser[]>;
  public currentList: Observable<DetailUser[]>;
  data: DetailUser[];

  constructor() { 
    this.currentListSubject = new BehaviorSubject<DetailUser[]>(this.list);
    this.currentList = this.currentListSubject.asObservable();
  }

   public get(): DetailUser[]{
     return this.list 
    }

    public deleteDetailUser(name: string): void
    {
     console.log("DetailUserService.deleteUserService",name)

      let index = this.list.findIndex(d => d.name === name); //find index in your array
      if(index != -1)
        {
           this.list.splice(index, 1); //remove element from array
           this.set(this.list)

          }
    }
 
    public updateDetailUser(detailuser: DetailUser): void{
      console.log("DetailUserService.updateDetailUser",detailuser.name)
    
     
      let index = this.list.findIndex(d => d.name === detailuser.name); //find index in your array
        if(index != -1) {
        this.list[index]=detailuser;
        this.set(this.list)
        }
        
    
    }

  public insertDetailUser(name:string, firstname:string,nationality:string, age:string,sex:string): void{
      console.log("DetailUserService.insertUserService")
      
      
      this.list.push({name:name, firstname:firstname,nationality:nationality, age:age,sex:sex});
      this.set(this.list)

  }
  public set(list: DetailUser[]):void{
    this.currentListSubject.next(list);
    }
  
    
 }
 