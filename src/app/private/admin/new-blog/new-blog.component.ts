import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlogsService } from '../../blogs.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/public/user.service';

@Component({
  selector: 'app-new-blog',
  templateUrl: './new-blog.component.html',
  styleUrls: ['./new-blog.component.css']
})
export class NewBlogComponent implements OnInit {
  newBlog!: FormGroup;
  data!: any[];
  userId!: number;



  constructor(private formBuilder: FormBuilder, private blogService: BlogsService, private http: HttpClient, private router: Router, private userService: UserService) {

    this.newBlog = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      content: ['', [Validators.required, Validators.minLength(30)]],
      autor: ['', [Validators.required, Validators.minLength(30)]],
      category: ['', [Validators.required]],
      date: ['', [Validators.required, this.validarFecha]],
  
    })

  }
  

  ngOnInit(): void {
    this.userService.getUserData(1);
  }

  onSubmit(){
    if(this.newBlog){
      this.blogService.newBlog(this.newBlog.value).subscribe(
        (res) => {
          this.msgAlert('success', 'Blog creado');
          this.router.navigate(['/admin']);
        }, (err) =>{
          this.msgAlert('error', 'Error al crear el blog');

        }
      )
    }else{
      this.msgAlert('error', 'Error al crear el blog');
    }
    
  }


  // dargar info de los blogs
  /*loadUser(){
    this.userService.getUserData(this.userId).subscribe(
      (user: any) => {
        this.data = user;
      }, (error) => {
        console.error(error);
      }
    )
    //this.userService.getUserData(id);
  }*/


  // alerta con sweetAlert
  msgAlert = (icon: any, title: any) =>{

    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }

    })

    Toast.fire({
      icon: icon,
      title: title
    })
  }

  // validar fecha
  validarFecha(control: any){
    const regex = /^\d{4}-\d{2}-\d{2}$/;

    if(!control.value.match(regex)){
      return { formatoInvalido: true}
    }

    return null;
  }

}
