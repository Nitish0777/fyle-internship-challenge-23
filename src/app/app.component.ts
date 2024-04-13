import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  githubUsername: string = '';
  userData: any;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    
  }

  searchUser() {
    this.apiService.getUser(this.githubUsername).subscribe(
      (user: any) => {
        this.userData = user;
        
      },
      (error) => {
        console.error('Error fetching user:', error);
      }
    );
  }

}
