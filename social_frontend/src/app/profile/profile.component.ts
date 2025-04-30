import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Profile {
  id: number;
  username: string;
  email: string;
}

@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  profile !: Profile

  constructor(private apiService: ApiService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.apiService.getProfile(parseInt(id)).subscribe(
        (response: any) => {
          this.profile = response;
          console.log(this.profile);
        },
        (error) => {
          console.error('Error fetching profile', error);
        }
      );
    } else {
      console.error('No ID provided in route parameters');
    }
  }
}