import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../models/user'; 
import { LoginService } from '../../services/login/login.service';
import { Md5 } from 'ts-md5/dist/md5';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  myFormGroup: FormGroup;
  returnUrl: string;

  public list: User[] = [];
  static list: any;
  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private route: ActivatedRoute,
    private router: Router,

  ) {   }

  ngOnInit(): void {
    this.myFormGroup = this.formBuilder.group({
      username: [{ value: null }, Validators.required],
      password: [{ value: null }, Validators.required]
    });

   this.myFormGroup.setValue({
      username: null,
      password: null,
   });
   this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
  }


    // convenience getter for easy access to form fields
  
    onSubmit(): void {
      console.log('login')
    
    if (this.myFormGroup.valid) {
      // crypter le password en md5 avant de l'envoyer

      this.myFormGroup.value.password = Md5.hashStr(this.myFormGroup.value.password).toString();

      this.loginService.login(this.myFormGroup.value).then(user=>{
       // console.log(user)
       if(user){
        this.router.navigate(['/home']);

       }
      })       
    }
  }
}


