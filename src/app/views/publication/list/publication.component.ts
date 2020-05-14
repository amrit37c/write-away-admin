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
  savedPublications: Array<any> = [];
  publicationRights = [
    "",
    "Open for all",
    "Open for self",
    "Open for invitees only",
  ]; //// 1 - open for all, 2 - open for self, 3 - open for invitees only

  patronMember: number = 0;
  vipMember: number = 0;

  constructor(private service: PublicationService, private router: Router) {}

  ngOnInit() {
    const route = this.router.url.split("/").pop();
    console.log("ex", route);
    let type;
    // type - 1 = saved, 2 = recent, 3 = archieved
    if (route === "publications") {
      this.publicationAll = true;
      this.currentPublication = "Active";
    } else if (route === "open-publication") {
      type = 1;

      this.publicationAll = false;
      this.currentPublication = "Open";
    } else if (route === "closed-publication") {
      this.publicationAll = false;
      this.currentPublication = "Closed";
    } else {
      this.publicationAll = false;
      this.currentPublication = "Rejected";
    }
    console.log("this", this.publicationAll);

    this.getBlogs(route); // fetch all blogs
  }

  getBlogs(type?) {
    this.service.get(type).subscribe((_response) => {
      this.data = _response.body.data;
      this.savedPublications = this.data.filter((el) => {
        console.log("el", el);
      });
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

  navigate(url) {
    this.router.navigateByUrl("/publications/" + url);
  }
}
