import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AgeGroupRoutingModule } from "./age-groupu-routing.module";
import { AgeGroupComponent } from "./age-group.component";
import { FormsModule } from "@angular/forms";
import { ModalModule } from "ngx-bootstrap/modal";

@NgModule({
  declarations: [AgeGroupComponent],
  imports: [
    CommonModule,
    AgeGroupRoutingModule,
    FormsModule,
    ModalModule.forRoot(),
  ],
})
export class AgeGroupModule {}
