import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { BlogsComponent } from "./blogs.component";
import { CreateBlogComponent } from "./create-blog/create-blog.component";

const routes: Routes = [
  { path: "", component: BlogsComponent },
  { path: "create-blog", component: CreateBlogComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlogsRoutingModule {}
