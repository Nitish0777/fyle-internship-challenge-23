import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private cache: { [key: string]: any } = {};

  constructor(private httpClient: HttpClient) {}

  getUser(githubUsername: string): Observable<any> {
    if (!githubUsername) {
      return throwError(() => new Error('GitHub username is required.'));
    }

    const url = `https://api.github.com/users/${githubUsername}`;

    if (this.cache[url]) {
      return of(this.cache[url]);
    } else {
      return this.httpClient.get(url).pipe(
        tap((user) => {
          this.cache[url] = user;
          console.log('User fetched successfully');
        }),
        catchError(this.handleError)
      );
    }
  }

  getRepos(
    githubUsername: string,
    page: number,
    perPage: number
  ): Observable<any> {
    if (!githubUsername) {
      return throwError(() => new Error('GitHub username is required.'));
    }

    const url = `https://api.github.com/users/${githubUsername}/repos?page=${page}&per_page=${perPage}`;

    if (this.cache[url]) {
      return of(this.cache[url]);
    } else {
      return this.httpClient.get(url).pipe(
        tap((repos) => {
          this.cache[url] = repos;
          console.log('Repos fetched successfully', repos);
        }),
        catchError(this.handleError)
      );
    }
  }

  private handleError(error: any) {
    console.error('An error occurred:', error.error || error.message || error);
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
