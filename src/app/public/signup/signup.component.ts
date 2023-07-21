import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { UserService } from '../user.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
  signUpForm!: FormGroup;
  patternPassword = '(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,}';
  userData!: any;
  apiURL = (`${environment.apiURL}/signup`);


  constructor(private formBuilder: FormBuilder, private userService: UserService, public http: HttpClient, private cookieService: CookieService, public router: Router) {
    
    this.signUpForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.pattern(this.patternPassword)]],

    })

  }

  ngOnInit() {
    
    //this.postData();
    this.userService.getRoles();

  }

  createUser(user: any){
    console.log(JSON.stringify(user));

    this.userService.createUser(user).subscribe({
      next: response=> console.log(response),
      error: error=> console.log(error),
      
    }
    )
    
  }

  onSubmit(){

    console.log(this.signUpForm.value);
    
    this.http.post(this.apiURL, this.signUpForm.value).subscribe((response) => {
      console.log('response correctly received', response);

      
    }, (error) => {
      console.log('error', error);
      
    })
  }
  

  /*registerUser(user){
      this.userService.registerUser(user).subscribe(response => {
        console.log('usuario registrado', response);
        
      }, error => {
        console.error('error', error);
        
      })
    }*/

}


