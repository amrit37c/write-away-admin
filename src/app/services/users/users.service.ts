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
export class UsersService extends BaseService {
  constructor(public http: HttpClient, public router: Router) {
    super(`${environment.baseUrl}${environment.adminApi.users}`, http, router);
  }
}
