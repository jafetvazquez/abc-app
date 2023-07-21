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

    if(!this.cookie){
      this.router.navigate(['/']);
      return false
    }

    return true;
    
  }
  
}
