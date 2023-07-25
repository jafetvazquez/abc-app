import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class BlogsService {
  private apiURL = environment.apiURL;
  resultsSearch!: any[];

  constructor(private http: HttpClient) { }

  // obtener data de todos los blogs
  getData(){
    return this.http.get<any[]>(`${this.apiURL}/blogs`);
  }

  // crear blog
  newBlog(newBlogForm: any){
    const formData = new FormData();

    formData.append('title', newBlogForm.title);
    formData.append('content', newBlogForm.content);
    formData.append('autor', newBlogForm.autor);
    formData.append('category', newBlogForm.category);
    formData.append('date', newBlogForm.date);

    const url = (`${this.apiURL}/post_blog`);
    return this.http.post<any>(url, formData);
  }

  // obtner data al buscar
  searchBlog(query: string){
    const newURL = (`${this.apiURL}/search?title=`);
    return this.http.get<any[]>(newURL + query);
  }

  // mostrar busqueda
  setResultsSearch(resultados: any[]){
    this.resultsSearch = resultados;
  }

  // obtener data mediante id
  getBlogById(id: number){
    const newURL = (`${this.apiURL}/blogs/${id}`);
    return this.http.get<any[]>(newURL);
  }


  // obtener data mediante id
  updateBlog(id: number, blog: any){

    const formData = new FormData();

    formData.append('title', blog.title);
    formData.append('content', blog.content);
    formData.append('autor', blog.autor);
    formData.append('category', blog.category);
    formData.append('date', blog.date);

    const newURL = (`${this.apiURL}/edit_blog/${id}`);
    return this.http.post<any[]>(newURL, formData);
  }

}
