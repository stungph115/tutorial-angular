import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
//service
import { UserService } from 'src/app/services/user/user.service'; 
//model
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login/login.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DropzoneComponent , DropzoneDirective,
  DropzoneConfigInterface } from 'ngx-dropzone-wrapper';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public currentUser: User=<User>{};
  currentUserSubscription: Subscription;
  photoFormGroup: FormGroup;

 

  public config: DropzoneConfigInterface = {
    clickable: true,
    maxFiles: 1,
    autoReset: null,
    errorReset: null,
    headers: {},
     
  };

  
  
  constructor(
    private loginService: LoginService,
    private userService: UserService,
    public formbuilder: FormBuilder,
    
  ) { 

      
  }

  ngOnInit(): void {
    this.currentUserSubscription = this.userService.currentList.subscribe()
    this.currentUser = this.userService.get()
    this.config.headers ={Authorization: `Bearer ${this.currentUser.access_token}`,}
  }
  
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentUserSubscription.unsubscribe();
  }
   onSending(data): void {
    const file = data[0];
    const FormData = data[2];
    FormData.append('username', this.currentUser.username);
    console.log("data", data)
    window.location.reload();
  } 
  
}
