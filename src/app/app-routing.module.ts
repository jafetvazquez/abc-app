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
import { EditBlogComponent } from './private/admin/edit-blog/edit-blog.component';
import { NewBlogComponent } from './private/admin/new-blog/new-blog.component';
import { VerBlogComponent } from './private/user/ver-blog/ver-blog.component';
import { VerBlogComponentAdmin } from './private/admin/ver-blog/ver-blog.component';

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
    path: 'admin/new_blog',
    component: NewBlogComponent,
    data: {
      role: 'admin'
    },
    canActivate: [AdminGuardGuard]
  },
  {
    path: 'admin/blog/:id',
    component: VerBlogComponentAdmin,
    data: {
      role: 'admin'
    },
    canActivate: [AdminGuardGuard]
  },
  {
    path: 'admin/blog/:id/edit/:id',
    component: EditBlogComponent,
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
    path: 'user/blog/:id',
    component: VerBlogComponent,
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
