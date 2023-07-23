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

  loadData(){
    this.blogService.getData().subscribe(
      (res: any) => {
        this.data = res;
        console.log(res);
        
      }, (err) => {
        console.error('error loading data');
        
      }
    )
  }

}
