import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
// Custom Modules
import { ComponentsModule } from "../components/components.module";

// Routing Modules
import { BlogsRoutingModule } from "./blogs-routing.module";

// Component
import { BlogsComponent } from "./blogs.component";
import { FormComponent } from "./form/form.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ModalModule } from "ngx-bootstrap/modal";

@NgModule({
  declarations: [BlogsComponent, FormComponent],
  imports: [
    CommonModule,
    BlogsRoutingModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
  ],
})
export class BlogsModule {}
