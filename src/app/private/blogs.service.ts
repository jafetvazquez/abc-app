import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class BlogsService {
  private apiURL = environment.apiURL;

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
    const newURL = `${this.apiURL}/search?title=`;
    return this.http.get<any[]>(newURL + query);
  }

}
