import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptorInterceptor implements HttpInterceptor {


  constructor(private cookieService: CookieService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const token: string = this.cookieService.get('token'); // jwt token

    //console.log(token);
    

    //const userType = decodeData.user;

    // Verificar si existe el token y si el req no tiene header de Authorization
    if(token && !request.headers.has('Authorization')){
      const base64Url = token.split('.')[1]; // obyiene la parte de datos del token
      const base64 = base64Url.replace('-', '+').replace('_', '/'); // Reemplaza caracteres especiales
      const decodeData = JSON.parse(atob(base64)); // Decodifica y parsea la parte de datos como JSON*/
      const userRol = decodeData.data[0].rol

      //console.log(userRol);

      // configurar el encabezado Authorization con el token
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      })


      // lógica para mdificar el request según el tipo de usuario
      if(userRol === 'admin'){
        // si el usuario es un admin, se agrega el encabezado
      }
      
    }

    const currentRequest = request.clone(
      {
        setHeaders:{
          authorization: `Bearer ${token}`
        }
      }
    )
    
    request = currentRequest;

    return next.handle(request);
  }
}
