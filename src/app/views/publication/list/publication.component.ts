import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { PublicationService } from "src/app/services/publications/publication.service";
import { debug } from "util";
import { environment } from "../../../../environments/environment";

@Component({
  selector: "app-publication",
  templateUrl: "./publication.component.html",
  styleUrls: ["./publication.component.css"],
})
export class PublicationComponent implements OnInit {
  url = environment.url;
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
  publisher: number = 0;
  writer: number = 0;
  followers: number = 0;
  submissions: number = 0;
  openPub: number = 0;
  closedPub: number = 0;
  savedPub: number = 0;
  closedPubGenre: number = 0;
  closedPubAgeGroups: number = 0;
  closedPubLanguages: number = 0;
  closedPubCat: number = 0;

  openPubGenre: number = 0;
  openPubAgeGroups: number = 0;
  openPubLanguages: number = 0;
  openPubCat: number = 0;

  savedPubGenre: number = 0;
  savedPubAgeGroups: number = 0;
  savedPubLanguages: number = 0;
  savedPubCat: number = 0;

  constructor(private service: PublicationService, private router: Router) {}

  ngOnInit() {
    const route = this.router.url.split("/").pop();
    console.log("ex", route);
    let type;
    if (route === "publications") {
      this.publicationAll = true;
      this.currentPublication = "Active";
    } else if (route === "open-publication") {
      type = 1;
      this.publicationAll = false;
      this.currentPublication = "Open";
    } else if (route === "saved-publication") {
      type = 1;
      this.publicationAll = false;
      this.currentPublication = "Saved";
    } else if (route === "closed-publication") {
      this.publicationAll = false;
      this.currentPublication = "Closed";
    } else {
      this.publicationAll = false;
      this.currentPublication = "Rejected";
    }
    console.log("this", this.publicationAll);

    this.getPublication(route); // fetch all publication with filters
    this.getHomePublication(); // fetch home stas
  }

  getPublication(type?) {
    this.service.get(type).subscribe((_response) => {
      this.data = _response.body.data;
      this.savedPublications = this.data.filter((el) => el.isPublished == true);
    });
  }
  getHomePublication(type?) {
    this.service.getPublicationStats().subscribe((_response) => {
      this.openPub = _response.body.open;
      this.closedPub = _response.body.closed;
      this.savedPub = _response.body.saved;

      this.closedPubGenre =
        (_response.body.data.closedPub.genre.length &&
          _response.body.data.closedPub.genre[0].sum) ||
        0;
      this.closedPubAgeGroups =
        (_response.body.data.closedPub.ageGroup.length &&
          _response.body.data.closedPub.ageGroup[0].sum) ||
        0;
      this.closedPubCat =
        (_response.body.data.closedPub.categoryCon.length &&
          _response.body.data.closedPub.categoryCon[0].sum) ||
        0;
      this.closedPubLanguages =
        (_response.body.data.closedPub.languages.length &&
          _response.body.data.closedPub.languages[0].sum) ||
        0;

      this.openPubGenre =
        _response.body.data.openPub.genre.length &&
        _response.body.data.openPub.genre[0].sum;
      this.openPubAgeGroups =
        _response.body.data.openPub.ageGroup.length &&
        _response.body.data.openPub.ageGroup[0].sum;
      this.openPubCat =
        _response.body.data.openPub.categoryCon.length &&
        _response.body.data.openPub.categoryCon[0].sum;
      this.openPubLanguages =
        _response.body.data.openPub.languages.length &&
        _response.body.data.openPub.languages[0].sum;

      this.savedPubGenre =
        _response.body.data.savedPub.genre.length &&
        _response.body.data.savedPub.genre[0].sum;
      this.savedPubAgeGroups =
        _response.body.data.savedPub.ageGroup.length &&
        _response.body.data.savedPub.ageGroup[0].sum;
      this.savedPubCat =
        _response.body.data.savedPub.categoryCon.length &&
        _response.body.data.savedPub.categoryCon[0].sum;
      this.savedPubLanguages =
        _response.body.data.savedPub.languages.length &&
        _response.body.data.savedPub.languages[0].sum;

      // closedPubGenre: number = 0;
      // closedPubAgeGroups: number = 0;
      // closedPubLanguages: number = 0;
      // closedPubCat: number = 0;
    });
  }

  publishPublication(id) {
    this.service.put(id, { isPublished: true }).subscribe((_response) => {
      console.log("", _response);
      this.getPublication("saved-publication");
    });
  }

  updatePublication(id, type) {
    const status = { publicationStatus: type };

    this.service.put(id, status).subscribe((_response) => {
      this.router.navigate(["/publications"]);
    });
  }

  updateOpenPub(id) {
    this.service
      .putPublication(id, {
        publicationStatus: 2,
      })
      .subscribe((_response) => {});
  }

  navigate(url) {
    this.router.navigateByUrl("/publications/" + url);
  }
}
