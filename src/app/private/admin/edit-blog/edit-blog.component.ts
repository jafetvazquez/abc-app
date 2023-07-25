import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlogsService } from '../../blogs.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.css']
})
export class EditBlogComponent implements OnInit {
  editBlog!: FormGroup;
  blog: any = {}
  data!: any[];
  blogId!: number;
  userData!: any[];

  constructor(private formBuilder: FormBuilder, private blogService: BlogsService, private route: ActivatedRoute) {

    this.editBlog = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      content: ['', [Validators.required, Validators.minLength(30)]],
      autor: ['', [Validators.required, Validators.minLength(30)]],
      category: ['', [Validators.required]],
      date: ['', [Validators.required, this.validarFecha]],
  
    })

  }

  ngOnInit(): void {

    // obtenemos el id de la ruta
    const blogId = this.route.snapshot.params['id'];

    // cargamos la data del blog al cargar la vista
    this.loadBlog(blogId);    
  

  }

  // metodo para cargar blog
  loadBlog(id: number){
    this.blogService.getBlogById(id).subscribe(
      (blog: any) => {
        this.blog = blog;
        //console.log(blog.id);
        
      }, (error: any) => {
        console.error(error);
        
      }
    );
  }


  updateBlog(){
    // pasamos el form a form data
    if(this.editBlog){

      Swal.fire({
        title: '¿Estás seguro de editar?',
        text: "Esta acción no se puede revertir...",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#1d4ed8',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Sí, editar!'
      }).then((result) => {
        if (result.isConfirmed) {

          this.blogService.updateBlog(this.blog.id, this.blog).subscribe(
            (res) => {
              //console.log(this.blog);
              console.log('blog actualizado', res);
            }, (err) => {
              this.msgAlert('error', 'Error al editar')
              console.log('error', err);
            }
          )

          this.msgAlert('success', 'Blog editado')
        }
      })

    }else{
      this.msgAlert('error', 'Error al editar')
      
    }

    
  }


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
