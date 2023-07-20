import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  patternPassword = '(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,}';

  apiURL = `${environment.apiURL}/login`;
  responseToken: any;

  constructor(public formBuilder: FormBuilder, private http: HttpClient, private cookieService: CookieService, public router: Router) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(this.patternPassword)]],
    });
    
  }

  ngOnInit() {
    
  }

  /*onSubmit(){

    console.log(this.loginForm.value);
    
    this.http.post(this.apiURL, this.loginForm.value).subscribe((response) => {
      console.log('response correctly received', response);

      this.cookieService.set('token_acces', 'ESTO_DEBE SER DINAMICO', 4, '/');
      this.router.navigate(['/admin'])
      
    }, (error) => {
      console.log('error', error);
      
    })
  }*/
  onSubmit(){
    const formData = new FormData();

    formData.append('email', this.loginForm.value.email);
    formData.append('password', this.loginForm.value.password);

    this.http.post(this.apiURL, formData).subscribe(
      (res) => {

        if(res != null){
          //console.log('respuesta', res);
          this.responseToken = res;
          this.cookieService.set('token', this.responseToken, 4, '/');
          this.router.navigate(['/admin']);
        }else{
          console.log('error');
          
        }

        
        
      }, (error)=> {
        console.log('error', error);
        
      }
    )

  }
}
