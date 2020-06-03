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
export class AgeGroupService extends BaseService {
  url = `${environment.baseUrl}${environment.adminApi.ageGroup}`;
  constructor(public http: HttpClient, public router: Router) {
    super(
      `${environment.baseUrl}${environment.adminApi.ageGroup}`,
      http,
      router
    );
  }
  /*** put on the server **/
  removeImg(id, payload): Observable<any> {
    return this.http
      .put<any>(`${this.url}/${id}/genre-img-update`, payload, {
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
}
