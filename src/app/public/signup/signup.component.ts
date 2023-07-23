import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { UserService } from '../user.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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
      username: ['', [Validators.required, Validators.minLength(3), this.noEspacios]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.pattern(this.patternPassword)]],

    })

  }

  ngOnInit() {

  }

  

  onSubmit(){

    if(this.signUpForm){
      this.userService.registerUser(this.signUpForm.value).subscribe(
        (res) => {
          //console.log('response', res);
          this.msgAlert('success', 'Cuenta creada, inicia sesión')
          this.router.navigate(['/']);
          
        }, (error) => {
          this.msgAlert('error', 'Error al crear cuenta')
          console.error('error', error);
          
        }
      )
    }else{
      this.msgAlert('error', 'Llena el formulario')

    }
    
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

  // funcion para no aceptar espacios en username
  noEspacios(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const valor = control.value;
      if (valor && valor.trim().length === 0) {
        return { noEspacios: true };
      }
      return null;
    };
  }

}


