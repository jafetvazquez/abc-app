import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment.prod';
import { CookieService } from 'ngx-cookie-service';
import { Observable, catchError, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiURL;
  private newURL = `${this.apiUrl}/users`
  private token: string;

  constructor(public http: HttpClient, private cookieService: CookieService, public router: Router) {
    // obtenemos token
    this.token = cookieService.get('token');
  }

  // servico para iniciar sesión
  login(loginForm: any){
    const formData = new FormData();

    formData.append('email', loginForm.email);
    formData.append('password', loginForm.password);

    return this.http.post<any>(this.apiUrl + '/login', formData);
  }

  // servicio para cerrar sesión
  logout(){
    // borramos la cookie
    this.cookieService.delete('token');
  }


  // servicio para registrar un usuario
  registerUser(signUpForm: any){
    const formData = new FormData();

    formData.append('name', signUpForm.name);
    formData.append('username', signUpForm.username);
    formData.append('email', signUpForm.email);
    formData.append('password', signUpForm.password);

    const url = (`${this.apiUrl}/signup`);
    return this.http.post<any>(url, formData);
  }



  // servicio para obtener los roles
  getRoles(){
    this.http.get(`${this.apiUrl}/roles`).subscribe((data: any) => {
      // consultamos los roles en el json
      const rolAdmin = data[0].rol;
      const rolUser = data[1].rol;
      // los guardamos en otro json
      const allRoles = [rolAdmin, rolUser];

      const rol = allRoles;
      //console.log(rol);

    });
    
  }


  // matches los roles
  rolMatch(allowedRoles: any): boolean | undefined {
    let isMatch = false;
    const userRol: any = this.getRoles();
    return false
    /*if(userRol != null && userRol){
      
      for(let i = 0; i < userRol.length; i++){

        for(let j = 0; j < allowedRoles.length; j++){

          if(userRol[i].rol === allowedRoles[j]){
            isMatch = true;
            return isMatch;
          }else{
            return isMatch;
          }

        }

      }

    }*/
  }




  // función para obtener info del usuario
  getUserInfo():Observable<any> | undefined{
    // verificamos si el token está presente y es válido
    if(this.token){
      const httpOptions = {
        headers: new HttpHeaders({
          // Agregamos el token al tipo Bearer
          Authorization: `Bearer ${this.token}`
        })
      };

      // realizamos la solicitud http  para obtener la info del usuario
      return this.http.get<any>(this.newURL, httpOptions).pipe(
        catchError((error) => {
          // mensaje de error en caso de que no sea válido
          console.error('error', error);
          // return a login
          return of(null)
          this.router.navigate(['/']);
        })
      );

    }else{
      // return a login
      return of(null)
      this.router.navigate(['/']);
    }
  }


  
}
