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

  registerUser(user: any){
    const url = (`${this.apiUrl}/signup`);
    return this.http.post<any>(url, user);
  }

  createUser(user: any){
    const url = (`${this.apiUrl}/signup`);
    return this.http.post(url, JSON.stringify(user));
  }

  getRoles(){
    this.http.get(`${this.apiUrl}/roles`).subscribe(data => {
      console.log(data);
      
    });

    //console.log("data received");
    
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
