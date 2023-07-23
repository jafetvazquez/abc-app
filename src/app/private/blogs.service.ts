import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class BlogsService {
  private apiURL = environment.apiURL;

  constructor(private http: HttpClient) { }

  getData(){
    return this.http.get<any[]>(`${this.apiURL}/blogs`);
  }
}
