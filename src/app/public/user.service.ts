import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiURL;

  constructor(public http: HttpClient) { }

  registerUser(user: any){
    const url = `${this.apiUrl}/signup`;
    return this.http.post<any>(url, user);
  }

  createUser(user: any){
    const url = `${this.apiUrl}/signup`;
    return this.http.post(url, JSON.stringify(user));
  }

  getUsers(){
    this.http.get('https://jsonplaceholder.typicode.com/users').subscribe(data => {
      console.log(data);
      
    });

    console.log("data received");
    
  }

  
}
