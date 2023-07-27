import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogsService } from '../../blogs.service';
import { SharedService } from 'src/app/shared/shared.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ver-blog',
  templateUrl: './ver-blog.component.html',
  styleUrls: ['./ver-blog.component.css']
})
export class VerBlogComponentAdmin implements OnInit {
  blog!: any;

  constructor(private route: ActivatedRoute, private blogService: BlogsService, private sharedService: SharedService, private ruta: Router) { }

  ngOnInit(): void {

    const blogId = this.route.snapshot.params['id'];

    this.blogService.getBlogById(blogId).subscribe(
      (blog: any) => {
        this.blog = blog;
        //console.log(blog);
        
      }, (error: any) => {
        console.error(error);
        
      }
    )

  }


  // buscar mediante tags
  openTag(tag: string){
    this.ruta.navigate(['/admin'])

    this.blogService.searchByTag(tag).subscribe(
      (blog: any) => {
        this.sharedService.setResultadoBusqueda(blog);
        //console.log(blog);
        
      }, (err) => {
        console.error(err);
        
      }
    )
    
  }


  // buscar mediante tags
  deleteBlog(id: number){

    Swal.fire({
      title: '¿Eliminar Blog?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Si',
      confirmButtonColor: '#1d4ed8',
      denyButtonText: `No`,
      denyButtonColor: '#71717a',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {

        this.blogService.deleteBlog(id).subscribe(
          (blog: any) => {
            this.msgAlert('success', 'Blog eliminado');
            this.sharedService.setResultadoBusqueda(blog);
            this.ruta.navigate(['/admin']);
            
  
          }, (err) => {
            this.msgAlert('error', 'Error al eliminar')
            console.error(err);
            
          }
        )
      }
    })
    
    
  }




  // buscar mediante tags
  searchDate(date: string){
    this.ruta.navigate(['/admin'])

    this.blogService.searchByDate(date).subscribe(
      (blog: any) => {
        this.sharedService.setResultadoBusqueda(blog);
        //console.log(blog);
        
      }, (err) => {
        console.error(err);
        
      }
    )
    
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


}
