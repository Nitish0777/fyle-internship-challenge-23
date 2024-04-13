import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  getUser(githubUsername: string) {
    return this.httpClient
      .get(`https://api.github.com/users/${githubUsername}`)
      .pipe(
        tap(() => console.log('User fetched successfully')),
        catchError(this.handleError)
      );
  }

  // implement getRepos method by referring to the documentation. Add proper types for the return type and params
  getRepos(githubUsername: string, page: number, perPage: number) {
    return this.httpClient
      .get(
        `https://api.github.com/users/${githubUsername}/repos?page=${page}&per_page=${perPage}`
      )
      .pipe(
        tap((response) => console.log('Repos fetched successfully', response)),
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    console.error('An error occurred:', error.error || error.message || error);
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
