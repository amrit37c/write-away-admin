import { Injectable } from "@angular/core";
import { BaseService } from "../base.service";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class PublicationService extends BaseService {
  // baseUrl = `${environment.baseUrl}${environment.adminApi.publication}`;
  constructor(public http: HttpClient, public router: Router) {
    super(
      `${environment.baseUrl}${environment.adminApi.publication}`,
      http,
      router
    );
  }

  get(type?): Observable<any> {
    let httpParams;
    console.log("type", type);
    if (type == "open-publication") {
      httpParams = new HttpParams().set("publicationStatus", "2");
    } else if (type == "closed-publication") {
      httpParams = new HttpParams().set("publicationStatus", "3");
    } else if (type == "rejected-publication") {
      httpParams = new HttpParams().set("publicationStatus", "4");
    } else if (type == "saved-publication") {
      httpParams = new HttpParams().set("publicationStatus", "1");
    } else {
      // httpParams = new HttpParams().set("isPublished", "true");
    }
    return this.http
      .get<any>(this.url, {
        // headers: this.token(),
        params: httpParams,
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
  getPublicationStats(): Observable<any> {
    return this.http
      .get<any>(`${this.url}/${environment.adminApi.publicationHome}`, {
        // headers: this.token(),
        // params: httpParams,
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
  putPublication(id, payload): Observable<any> {
    return this.http
      .put<any>(`${this.url}/${id}`, payload, {
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
}
