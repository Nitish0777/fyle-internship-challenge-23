import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService],
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch user data', () => {
    const mockUserData = { name: 'John', age: 30 }; // Example user data
    service.getUser('john123').subscribe((user) => {
      expect(user).toEqual(mockUserData);
    });
    const req = httpMock.expectOne('https://api.github.com/users/john123');
    expect(req.request.method).toBe('GET');
    req.flush(mockUserData);
  });

  it('should fetch user repositories', () => {
    const mockReposData = [
      { name: 'repo1', description: 'Repo 1' },
      { name: 'repo2', description: 'Repo 2' },
    ]; // Example repos data
    service.getRepos('john123', 1, 10).subscribe((repos) => {
      expect(repos).toEqual(mockReposData);
    });
    const req = httpMock.expectOne(
      'https://api.github.com/users/john123/repos?page=1&per_page=10'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockReposData);
  });
});
