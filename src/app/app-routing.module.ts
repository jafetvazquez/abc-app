import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './public/login/login.component';
import { SignupComponent } from './public/signup/signup.component';
import { AdminComponent } from './private/admin/admin.component';
import { UserComponent } from './private/user/user.component';
import { UserGuardGuard } from './user-guard.guard';
import { AdminGuardGuard } from './admin-guard.guard';
import { ErrorComponent } from './public/error/error.component';

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
    canActivate: [AdminGuardGuard]
  },
  {
    path: 'user',
    component: UserComponent,
    data: {
      rol: 'user'
    },
    canActivate: [UserGuardGuard]
  },
  {
    path: 'error-404',
    component: ErrorComponent
  },
  {
    path: '**',
    component: ErrorComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
