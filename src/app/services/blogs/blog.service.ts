import { Injectable } from "@angular/core";
import { BaseService } from "../base.service";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class BlogService extends BaseService {
  constructor(public http: HttpClient, public router: Router) {
    super(`${environment.baseUrl}${environment.adminApi.blog}`, http, router);
  }
}
