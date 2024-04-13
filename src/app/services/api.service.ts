import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs'; // Import throwError
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  // Define a cache object to store cached data
  private cache: { [key: string]: any } = {};

  getUser(githubUsername: string): Observable<any> {
    const url = `https://api.github.com/users/${githubUsername}`;

    // Check if data is available in cache
    if (this.cache[url]) {
      // Return cached data as an observable
      return of(this.cache[url]);
    } else {
      // Fetch data from API and cache it
      return this.httpClient.get(url).pipe(
        tap((user) => {
          // Cache the fetched data
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
