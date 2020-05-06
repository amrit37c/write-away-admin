import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

// Custom Modules
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CollapseModule } from "ngx-bootstrap/collapse";

// Routing Modules
import { AppRoutingModule } from "./app-routing.module";

// Component
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./views/header/header.component";
import { SidebarComponent } from "./views/sidebar/sidebar.component";

@NgModule({
  declarations: [AppComponent, HeaderComponent, SidebarComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CollapseModule.forRoot(),
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
