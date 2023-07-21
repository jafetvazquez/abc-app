import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';

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
  getUser: any;

  constructor(public formBuilder: FormBuilder, private http: HttpClient, private cookieService: CookieService, public router: Router) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(this.patternPassword)]],
    });
    
  }

  ngOnInit() {

    
  }

  onSubmit(){
    const formData = new FormData();

    formData.append('email', this.loginForm.value.email);
    formData.append('password', this.loginForm.value.password);

    this.http.post(this.apiURL, formData).subscribe(
      (res:any) => {

        if(res != null){
          console.log('respuesta', res.token);
          console.log('data', res.data[0]);
          
          this.responseToken = res.token;
          this.getUser = res.data;
          this.cookieService.set('token', this.responseToken, 4, '/');
          this.router.navigate(['/admin']);
        }else{
          console.log('error');
          this.msgAlert('error', 'Error al iniciar sesión');
          
        }

        
        
      }, (error)=> {
        console.log('error', error);
        this.msgAlert('error', 'Error al iniciar sesión');
      }
    )

  }

  msgAlert = (icon: any, title: any) =>{

    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }

    })

    Toast.fire({
      icon: icon,
      title: title
    })
  }
}
