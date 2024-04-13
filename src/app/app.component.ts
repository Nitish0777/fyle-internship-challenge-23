import { Component } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  githubUsername: string = '';
  userData: any;
  repos: any[] = [];
  isLoading: boolean = false;
  currentPage: number = 1;
  totalPages: number | null = null; 

  constructor(private apiService: ApiService) {}

  searchUserData() {
    this.isLoading = true;

    this.apiService.getUser(this.githubUsername).subscribe(
      (user: any) => {
        this.userData = user;

        this.apiService
          .getRepos(this.githubUsername, this.currentPage, 10)
          .subscribe(
            (repos: any) => {
              this.repos = repos;
              this.totalPages = Math.ceil(user.public_repos / 10);
              this.isLoading = false;
            },
            (error) => {
              console.error('Error fetching repos:', error);
              this.isLoading = false;
            }
          );
      },
      (error) => {
        console.error('Error fetching user:', error);
        this.isLoading = false;
      }
    );
  }

  nextPage() {
    if (this.currentPage < this.totalPages!) {
      this.currentPage++;
      this.searchUserData();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.searchUserData();
    }
  }
}
