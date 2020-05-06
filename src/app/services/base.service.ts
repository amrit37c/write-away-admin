import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, retry, map } from "rxjs/operators";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";

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

  get(json?: string, page?, sort?): Observable<any> {
    return this.http
      .get<any>(this.url, {
        // headers: this.token(),
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

  handleError(err) {
    let errorMessage = err.message;
    if (err.status == 401) {
      alert("Invalid user");
    }
  }
}
