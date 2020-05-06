import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
// Custom Modules
import { ComponentsModule } from "../components/components.module";

// Routing Modules
import { BlogsRoutingModule } from "./blogs-routing.module";

// Component
import { BlogsComponent } from "./blogs.component";
import { CreateBlogComponent } from "./create-blog/create-blog.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [BlogsComponent, CreateBlogComponent],
  imports: [
    CommonModule,
    BlogsRoutingModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class BlogsModule {}
