import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogsService } from '../../blogs.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-ver-blog',
  templateUrl: './ver-blog.component.html',
  styleUrls: ['./ver-blog.component.css']
})
export class VerBlogComponent implements OnInit {
  blog!: any;

  constructor(private route: ActivatedRoute, private blogService: BlogsService) { }

  ngOnInit(): void {

    // obtenemos id
    const blogId = this.route.snapshot.params['id'];

    // cargamos la data del blog al cargar la vista
    this.blogService.getBlogById(blogId).subscribe(
      (blog: any) => {
        this.blog = blog;
        //console.log(blog);
        
      }, (error: any) => {
        console.error(error);
        
      }
    )

  }

}
