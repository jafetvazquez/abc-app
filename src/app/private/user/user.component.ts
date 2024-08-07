import { Component, OnInit } from '@angular/core';
import { BlogsService } from '../blogs.service';
import { SharedService } from 'src/app/shared/shared.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  data!: any[];
  results!: any[];
  private subscription!: Subscription;

  constructor(private blogService: BlogsService, private sharedService: SharedService) { }

  ngOnInit(): void {
    this.loadData();

    this.loadSearch();
    
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
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
    this.subscription = this.sharedService.getResultadosBusqueda().subscribe((res: any) => {
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
