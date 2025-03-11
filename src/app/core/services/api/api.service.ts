import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
/**
* Makes a GET request to the specified API path and returns the response as an Observable.
* @template T - The type of the response data.
* @param path - The API path to make the request to.
*/
  get<T>(path: string): Observable<T>{
    return this.http.get<T>(path);
  }
}
