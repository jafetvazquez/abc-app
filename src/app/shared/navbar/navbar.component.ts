import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogsService } from 'src/app/private/blogs.service';
import { UserService } from 'src/app/public/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  results!: any[];
  query!: string;

  constructor(private userService: UserService, private router: Router, private blogService: BlogsService) { }

  ngOnInit(): void {
  }

  // buscar data
  searchBlogs(){
    this.blogService.searchBlog(this.query).subscribe(
      (blog: any) => {
        this.blogService.setResultsSearch(blog);
        //this.results = blog;
        console.log(blog);
      }, (error) => {
        console.log('error', error);
        
      }
    )
  }

  // cerrar sesión
  logout(){
    Swal.fire({
      title: '¿Cerrar sesión?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Si',
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.userService.logout();
        this.msgAlert('success', 'Sesión cerrada');
        this.router.navigate(['/']);
        this.reloadPage();
      }
    })
    //console.log('cerrar sesión');
    
  }

  reloadPage(){
    const secToWait = 3;
    setTimeout(() => {
      window.location.reload();
    }, secToWait * 1000);
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
