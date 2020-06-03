import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { GenresRoutingModule } from "./genres-routing.module";
import { GenresComponent } from "./genres.component";
import { FormsModule } from "@angular/forms";
import { ModalModule } from "ngx-bootstrap/modal";

@NgModule({
  declarations: [GenresComponent],
  imports: [
    CommonModule,
    GenresRoutingModule,
    FormsModule,
    ModalModule.forRoot(),
  ],
})
export class GenresModule {}
