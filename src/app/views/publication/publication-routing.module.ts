import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { PublicationComponent } from "./list/publication.component";
import { FormComponent } from "./form/form.component";

const routes: Routes = [
  { path: "", component: PublicationComponent },
  { path: "create-publication", component: FormComponent },
  { path: "open-publication", component: PublicationComponent },
  { path: "closed-publication", component: PublicationComponent },
  { path: "rejected-publication", component: PublicationComponent },
  { path: "saved-publication", component: PublicationComponent },
  { path: "edit-publication/:id", component: FormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicationRoutingModule {}
