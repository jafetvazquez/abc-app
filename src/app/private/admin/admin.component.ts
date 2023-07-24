import { Component, OnInit } from '@angular/core';
import { BlogsService } from '../blogs.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  data!: any[];

  constructor(private blogService: BlogsService) { }

  ngOnInit(): void {
    this.loadData();
  }

  // dargar info de los blogs
  loadData(){
    this.blogService.getData().subscribe(
      (res: any) => {
        this.data = res;
        //const id = res[0].blog_id;
        //console.log(id);
        
      }, (err) => {
        console.error('error loading data');
        
      }
    )
  }

  selectBlog(id: number){
    //const idBlog = this.data[(id)].blog_id;
    console.log(id);
    
  }

}
