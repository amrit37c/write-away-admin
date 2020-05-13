import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { PublicationService } from "src/app/services/publications/publication.service";

@Component({
  selector: "app-publication",
  templateUrl: "./publication.component.html",
  styleUrls: ["./publication.component.css"],
})
export class PublicationComponent implements OnInit {
  data: Array<any> = [];
  publicationAll: boolean = true;
  currentPublication: string = "Active";

  activePublications: Array<any> = [];
  recentPublications: Array<any> = [];
  archivedPublications: Array<any> = [];
  publicationRights = [
    "",
    "Open for all",
    "Open for self",
    "Open for invitees only",
  ]; //// 1 - open for all, 2 - open for self, 3 - open for invitees only

  constructor(private service: PublicationService, private router: Router) {}

  ngOnInit() {
    const route = this.router.url.split("/").pop();
    console.log("ex", route);
    let type;
    // type - 1 = saved, 2 = recent, 3 = archieved
    if (route === "publications") {
      console.log("if");
      this.publicationAll = true;
      this.currentPublication = "Active";
    } else if (route === "open-publication") {
      type = 1;
      console.log("else if 1");
      this.publicationAll = false;
      this.currentPublication = "Open";
    } else if (route === "closed-publication") {
      this.publicationAll = false;
      this.currentPublication = "Closed";
      console.log("else if 2");
    } else {
      this.publicationAll = false;
      this.currentPublication = "Rejected";
      console.log("else if 3");
    }
    console.log("this", this.publicationAll);

    this.getBlogs(route); // fetch all blogs
  }

  getBlogs(type?) {
    this.service.get(type).subscribe((_response) => {
      this.data = _response.body.data;
    });
  }

  editBlog(id) {
    // this.router.navigateByUrl("/edit/" + id);
    this.router.navigate(["/publication/edit-publication/" + id]);
  }
  publishPublication(id) {
    this.service.put(id, { isPublished: true }).subscribe((_response) => {
      console.log("", _response);
      this.getBlogs("saved-publication");
    });
  }

  updatePublication(id, type) {
    const status = { publicationStatus: 2 };
    // this.service.put().subscribe(_response=>{
    //   console.log('response', _response);
    // })
  }
}
