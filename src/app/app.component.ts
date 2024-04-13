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
  userNotFound: boolean = false; // Add a boolean flag to track user not found
  reposPerPageOptions: number[] = [10, 20, 50, 100]; // Define the options for repositories per page
  reposPerPage: number = 10; // Default number of repositories per page

  constructor(private apiService: ApiService) {}

  searchUserData() {
    this.isLoading = true;
    this.userNotFound = false; // Reset userNotFound flag before making a new search

    this.apiService.getUser(this.githubUsername).subscribe(
      (user: any) => {
        this.userData = user;
        this.userNotFound = false; // Reset userNotFound flag when user is found

        this.apiService
          .getRepos(this.githubUsername, this.currentPage, this.reposPerPage) // Use the selected number of repositories per page
          .subscribe(
            (repos: any) => {
              this.repos = repos;
              this.totalPages = Math.ceil(
                user.public_repos / this.reposPerPage
              ); // Update total pages based on the selected repositories per page
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
        this.userNotFound = true; // Set userNotFound flag when user is not found
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
