import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserGuardGuard implements CanActivate {

  private cookie: string | null = this.cookieService.get('token');

  constructor(private cookieService: CookieService, private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //return true;
    return this.checkCookie();
  }

  private checkCookie(): boolean{

    if(!this.cookie){
      this.router.navigate(['/']);
      return false
    }

    return true;
    
  }
  
}
