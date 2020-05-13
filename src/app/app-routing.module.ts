import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  { path: "", redirectTo: "blogs", pathMatch: "full" },
  {
    path: "blogs",
    loadChildren: () =>
      import("./views/blogs/blogs.module").then((m) => m.BlogsModule),
  },
  {
    path: "publications",
    loadChildren: () =>
      import("./views/publication/publication.module").then(
        (m) => m.PublicationModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
