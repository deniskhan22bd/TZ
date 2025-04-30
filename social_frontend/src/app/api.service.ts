import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl: string = 'http://127.0.0.1:8000/';
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post(this.baseUrl + 'login/', { email, password });
  }

  register(username: string, email: string, password: string) {
    return this.http.post(this.baseUrl + 'register/', { username, email, password });
  }

  getProfile(id: number) {
    return this.http.get(this.baseUrl + `profile/${id}/`);
  }
 
  
  getPosts() {
    return this.http.get(this.baseUrl + 'api/posts/');
  }

  createPost(user: number, title: string, content: string) {
    return this.http.post(this.baseUrl + 'api/posts/', {user, title, content});
  }

  deletePost(id: number) {
    return this.http.delete(this.baseUrl + `api/posts/${id}/`);
  }
}
