import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PublicModule } from './public/public.module';
import { AdminComponent } from './private/admin/admin.component';
import { UserComponent } from './private/user/user.component';
import { CookieService } from 'ngx-cookie-service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptorInterceptor } from './jwt-interceptor.interceptor';
import { NavbarComponent } from './shared/navbar/navbar.component';

@NgModule({
  declarations: [AppComponent, AdminComponent, UserComponent, NavbarComponent],
  imports: [BrowserModule, AppRoutingModule, PublicModule, HttpClientModule],
  providers: [CookieService, {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorInterceptor, multi: true}],
  bootstrap: [AppComponent],
})
export class AppModule {}
