import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { BlogsComponent } from "./blogs.component";
import { FormComponent } from "./form/form.component";

const routes: Routes = [
  { path: "", component: BlogsComponent },
  { path: "create-blog", component: FormComponent },
  { path: "saved-blog", component: BlogsComponent },
  { path: "recent-blog", component: BlogsComponent },
  { path: "archieved-blog", component: BlogsComponent },
  { path: "edit-blog/:id", component: FormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlogsRoutingModule {}
