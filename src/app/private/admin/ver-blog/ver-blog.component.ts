import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogsService } from '../../blogs.service';
import { SharedService } from 'src/app/shared/shared.service';

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

}
