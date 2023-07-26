import { Component, OnInit } from '@angular/core';
import { BlogsService } from '../blogs.service';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/shared/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  data!: any[];
  results!: any[];
  private subscription!: Subscription;

  constructor(private blogService: BlogsService, private sharedService: SharedService, private ruta: Router) { }

  ngOnInit(): void {
    this.loadData();

    this.loadSearch();
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

  // load busqueda
  loadSearch(){
    this.subscription = this.sharedService.getResultadosBusqueda().subscribe(
      (res: any) => {
      this.results = res;
    }, (error) => {
      console.error(error);
    })
  }

  // buscar mediante tags
  openTag(tag: string, event: Event){
    event.stopPropagation();
    //this.ruta.navigate(['/admin'])

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
  searchDate(date: string, event: Event){
    event.stopPropagation();

    this.blogService.searchByDate(date).subscribe(
      (blog: any) => {
        this.sharedService.setResultadoBusqueda(blog);
        //console.log(blog);
        
      }, (err) => {
        console.error(err);
        
      }
    )
    
  }

  selectBlog(id: number){
    //const idBlog = this.data[(id)].blog_id;
    console.log(id);
    
  }

}
