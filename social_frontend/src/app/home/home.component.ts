import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { computeMsgId } from '@angular/compiler';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

export interface Post {
  id: number;
  title: string;
  content: string;
  created_at: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
}

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {
  posts: Post[] = [];
  showAlert = false
  constructor(private apiService: ApiService, private router: Router) { } 

  ngOnInit() {
    if (!localStorage.getItem('access')) {
      this.showAlert = true;
      setTimeout(() => {
        this.router.navigate(['/register']);
      }, 2000);
    }

    this.apiService.getPosts().subscribe(
      (response: any) => {
        this.posts = response;
        this.posts.reverse()
        console.log(this.posts);
      },
      (error) => {
        console.error('Error fetching posts', error);
      }
    );
  }
}
