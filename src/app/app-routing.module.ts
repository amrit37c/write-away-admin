import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
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
  {
    path: "genres",
    loadChildren: () =>
      import("./views/genres/genres.module").then((m) => m.GenresModule),
  },
  {
    path: "age-groups",
    loadChildren: () =>
      import("./views/age-group/age-group.module").then(
        (m) => m.AgeGroupModule
      ),
  },
  {
    path: "home",
    loadChildren: () =>
      import("./views/home/home.module").then((m) => m.HomeModule),
  },
  {
    path: "users",
    loadChildren: () =>
      import("./views/users/users.module").then((m) => m.UsersModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
