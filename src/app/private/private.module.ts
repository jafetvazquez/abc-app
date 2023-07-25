import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { VerBlogComponent } from './admin/ver-blog/ver-blog.component';


@NgModule({
  declarations: [
    VerBlogComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule
  ],
  
})
export class PrivateModule { }
