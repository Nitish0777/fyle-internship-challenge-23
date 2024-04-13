import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  githubUsername: string = '';
  userData: any;
  repos: any[] = []; // Declare the repos property

  constructor(private apiService: ApiService) {}

  ngOnInit() {}

  // searchUser() {
  //   this.apiService.getUser(this.githubUsername).subscribe(
  //     (user: any) => {
  //       this.userData = user;
  //       console.log('User fetched successfully:', user);
  //     },
  //     (error) => {
  //       console.error('Error fetching user:', error);
  //     }
  //   );
  // }

  // // implement the getRepos method
  // searchRepos() {
  //   this.apiService.getRepos(this.githubUsername, 1, 10).subscribe(
  //     (repos: any) => {
  //       this.repos = repos; // Assign fetched repos to the repos property
  //       console.log('Repos fetched successfully:', repos);
  //     },
  //     (error) => {
  //       console.error('Error fetching repos:', error);
  //     }
  //   );
  // }
  searchUserData() {
    this.apiService.getUser(this.githubUsername).subscribe(
      (user: any) => {
        this.userData = user;
        console.log('User fetched successfully:', user);

        // Fetch repositories after fetching user data
        this.apiService.getRepos(this.githubUsername, 1, 10).subscribe(
          (repos: any) => {
            this.repos = repos; // Assign fetched repos to the repos property
            console.log('Repos fetched successfully:', repos);
          },
          (error) => {
            console.error('Error fetching repos:', error);
          }
        );
      },
      (error) => {
        console.error('Error fetching user:', error);
      }
    );
  }
}
