import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  register() {
    if (this.form.valid) {
      const { username, email, password } = this.form.value;
      this.apiService.register(username, email, password).subscribe({
        next: (response: any) => {
          console.log('Registration successful', response);
          localStorage.setItem('access', response.access);
          localStorage.setItem('refresh', response.refresh);
          localStorage.setItem('userId', response.user.id);
          this.router.navigate([`/profile/${response.user.id}`]);
        },
        error: (error) => {
          console.error('Registration error:', error);
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
