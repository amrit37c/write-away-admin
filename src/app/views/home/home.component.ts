import { Component, OnInit } from "@angular/core";
import { HomeService } from "src/app/services/home/home.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  data: Array<any> = [];
  activeCustomer: number = 0;
  publishings: number = 0;
  blogsRead: number = 0;
  reviews: number = 0;
  shareCount: number = 0;
  blogLikeCount: number = 0;

  constructor(private service: HomeService) {}

  ngOnInit() {
    this.getStats();
  }

  getStats() {
    this.service.get().subscribe((_response) => {
      console.log(_response);
      this.activeCustomer = _response.body.data.customers.length;
      this.publishings = _response.body.data.publishings;
      this.blogsRead = _response.body.data.blogsRead.length;
      this.reviews = _response.body.data.reviews;
      this.shareCount = _response.body.data.shareCount;
      this.blogLikeCount = _response.body.data.blogLikeCount;
    });
  }
}
