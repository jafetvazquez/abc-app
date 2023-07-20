import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PublicModule } from './public/public.module';
import { AdminComponent } from './private/admin/admin.component';
import { UserComponent } from './private/user/user.component';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [AppComponent, AdminComponent, UserComponent],
  imports: [BrowserModule, AppRoutingModule, PublicModule],
  providers: [CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
