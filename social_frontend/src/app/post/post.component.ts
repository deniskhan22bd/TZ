import { Component } from '@angular/core';
import { Post } from '../home/home.component';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {
  form: FormGroup
  showAlert = false;
  posts: Post[] = [];

  constructor(private apiService: ApiService, private fb: FormBuilder, private router: Router
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
  }
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
        this.posts.filter((post: Post) => post.user.id == parseInt(localStorage.getItem('userId')!))
        this.posts.reverse()
        console.log(this.posts);
      },
      (error) => {
        console.error('Error fetching posts', error);
      }
    );
  }
  createPost() {
    if (this.form.valid) {
      const { title, content } = this.form.value;
      const userId = localStorage.getItem('userId');
      if (!userId) {
        console.error('User ID not found in local storage');
        return;
      }
      this.apiService.createPost(parseInt(userId), title, content).subscribe(
        (response: any) => {
          console.log('Post created successfully', response);
          this.posts.unshift(response); // Add the new post to the beginning of the posts array
          this.form.reset();
        },
        (error) => {
          console.error('Error creating post', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }

  deletePost(postId: number) {
    this.apiService.deletePost(postId).subscribe(
      (response: any) => {
        console.log('Post deleted successfully', response);
        this.posts = this.posts.filter((post) => post.id !== postId);
      },
      (error) => {
        console.error('Error deleting post', error);
      }
    );
  }


}