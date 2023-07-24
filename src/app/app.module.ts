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
import { UserRoleDirective } from './user-role.directive';
import { EditBlogComponent } from './private/admin/edit-blog/edit-blog.component';
import { NewBlogComponent } from './private/admin/new-blog/new-blog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    UserComponent,
    NavbarComponent,
    UserRoleDirective,
    EditBlogComponent,
    NewBlogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PublicModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    CookieService,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorInterceptor, multi: true}],
  bootstrap: [
    AppComponent
  ],
  exports: [
    UserRoleDirective
  ]
})
export class AppModule {}
