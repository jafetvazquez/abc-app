import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogsService } from '../../blogs.service';

@Component({
  selector: 'app-ver-blog',
  templateUrl: './ver-blog.component.html',
  styleUrls: ['./ver-blog.component.css']
})
export class VerBlogComponentAdmin implements OnInit {
  blog!: any;

  constructor(private route: ActivatedRoute, private blogService: BlogsService) { }

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

}
