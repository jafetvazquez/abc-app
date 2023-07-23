import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { UserService } from './public/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuardGuard implements CanActivate {

  private cookie: string | null = this.cookieService.get('token');

  constructor(private cookieService: CookieService, private router: Router, private userService: UserService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //return true;
    return this.checkCookie(route);
  }

  private checkCookie(route: ActivatedRouteSnapshot): boolean{
    // guardamos la data del user en una rray scope
    // const { scopes = []} = this.userService.getUserInfo();

    // revismos cual es el rol del user
    /*if(scopes.includes(route.data.rol)){
      
    }*/

    const isAuth = this.cookie;


    if(!isAuth){
      // si no esta autentificado lo regresa
      this.router.navigate(['/']);
      return false;
    }else{
      // decodificamos el token
      const base64Url = isAuth.split('.')[1]; // obtiene la parte de datos del token
      const base64 = base64Url.replace('-', '+').replace('_', '/'); // Reemplaza caracteres especiales
      const decodeData = JSON.parse(atob(base64)); // Decodifica y parsea la parte de datos como JSON*/
      const userRol = decodeData.data[0].rol

      // consultamos los roles de las rutas (admin, user)
      const role = route.data['role'] as Array<string>;
      console.log(userRol);
      //console.log(role);


      if(userRol === 'user'){
        //this.router.navigate(['/user']);
        return true;

      }else{
        this.router.navigate(['/error-404']);
        return false
      }
    }

    
    
  }

  
  
}
