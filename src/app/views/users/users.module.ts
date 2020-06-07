import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
// Custom Modules
import { ComponentsModule } from "../components/components.module";

// Routing Modules
import { UsersRoutingModule } from "./users-routing.module";

// Component
import { UsersComponent } from "./users.component";

@NgModule({
  declarations: [UsersComponent],
  imports: [CommonModule, UsersRoutingModule, ComponentsModule],
})
export class UsersModule {}
