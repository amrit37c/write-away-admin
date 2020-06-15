import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
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

  get(type?, sort?): Observable<any> {
    let httpParams = new HttpParams();

    if (type) {
      for (const key in type) {
        // console.log(`${key}: ${type[key]}`);
        console.log("APPEND IN JSON FILTER");
        httpParams = httpParams.append(key, type[key]);
      }
    }
    if (sort) {
      for (const key in sort) {
        console.log("APPEND IN SORT FILTER");
        httpParams = httpParams.append("sort", key);
      }
    }
    // httpParams.append("sort", "createdAt");
    // httpParams = new HttpParams().set(
    //   // Object.keys(json)[0],
    //   // Object.values(json)[0]
    //   "sort",
    //   "createdAt"
    // );

    const requestOptions = {
      params: httpParams,
      withCredentials: true,
    };
    return this.http
      .get<any>(this.url, {
        // headers: this.token(),
        // params: httpParams,
        params: httpParams,
        // withCredentials: true,
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
        // headers: this.token(✋),
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
