import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './public/login/login.component';
import { SignupComponent } from './public/signup/signup.component';
import { AdminComponent } from './private/admin/admin.component';
import { UserComponent } from './private/user/user.component';
import { UserGuardGuard } from './user-guard.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'admin',
    component: AdminComponent,
    data: {
      role: 'admin'
    },
    canActivate: [UserGuardGuard]
  },
  {
    path: 'user',
    component: UserComponent,
    data: {
      rol: 'user'
    },
    canActivate: [UserGuardGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
