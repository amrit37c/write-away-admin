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
export class BlogService extends BaseService {
  constructor(public http: HttpClient, public router: Router) {
    super(`${environment.baseUrl}${environment.adminApi.blog}`, http, router);
  }

  get(type?): Observable<any> {
    let httpParams;
    console.log("type", type);
    if (type == "saved-blog") {
      httpParams = new HttpParams().set("isPublished", "false");
    } else if (type == "recent-blog") {
      httpParams = new HttpParams().set("isPublished", "today");
    } else if (type == "archieved-blog") {
      httpParams = new HttpParams().set("isPublished", "yesterday");
    } else {
      httpParams = new HttpParams().set("isPublished", "true");
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
}
