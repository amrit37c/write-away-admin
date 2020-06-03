import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"],
})
export class SidebarComponent implements OnInit {
  isCollapsed: boolean = false;
  isPubCollapsed: boolean = false;
  isGenre: boolean = false;
  isAgeGroup: boolean = false;
  constructor() {}

  ngOnInit() {}
}
