import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, retry, map } from "rxjs/operators";
import { Router } from "@angular/router";

// @Injectable({
//   providedIn: "root",
// })
export class BaseService {
  url: string;
  router: Router;
  constructor(apiUrl, public http: HttpClient, router) {
    this.url = apiUrl;
    this.router = router;
  }

  get1(): Observable<any> {
    return this.http
      .get<any>(this.url, {
        responseType: "json",
      })
      .pipe(
        map((data) => {
          return data;
        }),
        catchError((error: any) => {
          return this.handleError(error);
        })
      );
  }

  /***
   * GET All record from the server
   **/

  get(type?): Observable<any> {
    return this.http
      .get<any>(this.url, {
        // headers: this.token(),
        responseType: "json",
        observe: "response",
      })
      .pipe(
        map((data) => {
          return data;
        }),

        catchError((error: any) => {
          return this.handleError(error);
        })
      );
  }

  /*** GET One record from the server **/
  getOne(id?: string): Observable<any> {
    return this.http
      .get<any>(id ? `${this.url}/${id}` : `${this.url}`, {
        // headers: this.token(),
        responseType: "json",
        observe: "response",
      })
      .pipe(
        map((data) => {
          return data;
        }),
        catchError((error: any) => {
          return this.handleError(error);
        })
      );
  }
  /*** Post to the server **/
  post(payload): Observable<any> {
    return this.http
      .post<any>(this.url, payload, {
        // headers: this.token(),
        responseType: "json",
        observe: "response",
      })
      .pipe(
        map((data) => {
          return data;
        }),
        catchError((error: any) => {
          return this.handleError(error);
        })
      );
  }

  /*** delete from the server **/
  delete(id): Observable<any> {
    return this.http
      .delete<any>(`${this.url}/${id}`, {
        // headers: this.token(),
        responseType: "json",
        observe: "response",
      })
      .pipe(
        map((data) => {
          return data;
        }),
        catchError((error: any) => {
          return this.handleError(error);
        })
      );
  }

  /*** put on the server **/
  put(id, payload): Observable<any> {
    return this.http
      .put<any>(`${this.url}/${id}`, payload, {
        // headers: this.token(),
        responseType: "json",
        observe: "response",
      })
      .pipe(
        map((data) => {
          return data;
        }),
        catchError((error: any) => {
          return this.handleError(error);
        })
      );
  }

  handleError(err) {
    let errorMessage = err.message;
    if (err.status == 401) {
      alert("Invalid user");
    } else {
      return throwError(err);
    }
  }
}
