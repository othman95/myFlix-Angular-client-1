import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators/catchError';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { AnonymousSubject } from 'rxjs/internal/Subject';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://moviemate-mk9e.onrender.com/';

@Injectable({
  providedIn: 'root'
})

export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }

  // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  public userLogin(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  public getAllMovies(): Observable<any> {

    const token = localStorage.getItem('token');

    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders(
        {
          Authorization: `Bearer ${token}`,
        })
    }).pipe(
      catchError(this.handleError)
    );
  }

  public getMovie(title: string): Observable<any> {
    return this.http.get(apiUrl + `movies/${title}`).pipe(
      catchError(this.handleError)
    );
  }

  public getMovieById(id: string): Observable<any> {
    return this.http.get(apiUrl + `movies/id/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  public getDirector(name: string): Observable<any> {
    return this.http.get(apiUrl + `movies/director/${name}`).pipe(
      catchError(this.handleError)
    );
  }

  public getGenre(name: string): Observable<any> {
    return this.http.get(apiUrl + `movies/genre/${name}`).pipe(
      catchError(this.handleError)
    );
  }

  public getUser(id: string): Observable<any> {
    return this.http.get(apiUrl + `users/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  public updateUser(id: string, userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.put(apiUrl + `users/${id}`, userDetails, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    }).pipe(
      catchError(this.handleError)
    );
  }

  public deleteUser(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + `users/${id}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    }).pipe(
      catchError(this.handleError)
    );
  }

  public addFavoriteMovie(userId: string, movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.post(apiUrl + `users/${userId}/favorites/${movieId}`, {}, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    }).pipe(
      catchError(this.handleError)
    );
  }

  public removeFavoriteMovie(id: string, movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + `users/${id}/favorites/${movieId}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some client-side error occurred:', error.error.message);
    } else {
      console.error(
        `Bakcend error status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}