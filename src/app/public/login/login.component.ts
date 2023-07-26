import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';
import { UserService } from '../user.service';

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
  getRol: any;

  constructor(public formBuilder: FormBuilder, private http: HttpClient, private cookieService: CookieService, public router: Router, private userService: UserService) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(this.patternPassword)]],
    });
    
  }

  ngOnInit() {


  }


  // función al momento de dar clic en iniciar sesión
  onSubmit(){
    this.userService.login(this.loginForm.value).subscribe(
      (res: any) => {

        if(res != null){
          //console.log('respuesta', res.token);
          //console.log('rol', res.data[0].rol);
          
          this.responseToken = res.token;
          const rol = this.getRol = res.data[0].rol;
          //this.getRol = res.data[0].rol;
          // guardamos en la cookie el token, la res y el tiempo
          this.cookieService.set('token', this.responseToken, 0.5, '/');

          // if que compara el rol del usuario
          if(rol === 'admin'){
            // si es admin nos manda a la ruta del admin
            this.router.navigate(['/admin'])
          }else if(rol === 'user'){
            // si es user nos manda a user
            this.router.navigate(['/user']);          
          }else{
            // si no existe nos deja en el login
            this.router.navigate(['/']);          
          }

          
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


  // alerta con sweetAlert
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
