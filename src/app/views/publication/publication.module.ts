import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// Custom Modules

// Routing Modules
import { PublicationRoutingModule } from "./publication-routing.module";

// Component
import { PublicationComponent } from "./list/publication.component";
import { FormComponent } from "./form/form.component";

@NgModule({
  declarations: [PublicationComponent, FormComponent],
  imports: [
    CommonModule,
    PublicationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class PublicationModule {}
