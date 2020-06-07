import { Component, OnInit, TemplateRef } from "@angular/core";
import { GenreService } from "src/app/services/genre/genre.service";
import { Router } from "@angular/router";

import { AgeGroupService } from "src/app/services/age-group/age-group.service";

@Component({
  selector: "app-age-group",
  templateUrl: "./age-group.component.html",
  styleUrls: ["./age-group.component.css"],
})
export class AgeGroupComponent implements OnInit {
  data: Array<any> = [];
  genreAll: boolean = true;
  isAddAge: boolean = false;
  isAddImage: boolean = false;

  from = "";
  to = "";
  topicMedia = [];
  id;
  editable: boolean = false;

  constructor(private service: AgeGroupService, private router: Router) {}

  ngOnInit() {
    const route = this.router.url.split("/").pop();
    this.getAgeGroups(); // fetch all age Groups
  }

  getAgeGroups() {
    this.service.get().subscribe((_response) => {
      this.data = _response.body.data;
    });
  }

  navigate(url) {
    this.router.navigateByUrl("/publications/" + url);
  }

  enableAddAge() {
    this.isAddAge = !this.isAddAge;
  }

  addAge() {
    if (this.from == "" || this.to == "") {
      alert("All the fields are required");
      return;
    }
    const age = `${this.from},${this.to}`;
    this.service
      .post({
        ageRange: age,
      })
      .subscribe((_response) => {
        alert(_response.body.message);
        this.from = "";
        this.to = "";
        this.getAgeGroups();
      });
  }

  updateAge() {
    const age = `${this.from},${this.to}`;
    this.service
      .put(this.id, {
        ageRange: age,
      })
      .subscribe((_response) => {
        alert(_response.body.message);
        this.from = "";
        this.to = "";
        this.getAgeGroups();
      });
  }

  onFileChanged(event, id) {
    const files = event.target.files[0];
    const uploadData = new FormData();
    uploadData.append("topicMedia", files);

    this.service.put(id, uploadData).subscribe((_response) => {
      alert(_response.body.message);
      // this.decline();
      this.getAgeGroups();
      this.topicMedia = _response.body.data;
    });
  }

  deleteAge(id) {
    if (confirm("Are you sure want to delete this age group")) {
      this.service.delete(id).subscribe((_response) => {
        alert(_response.body.message);
        this.getAgeGroups();
      });
    }
  }

  deleteOneImg(id, img) {
    this.service
      .removeImg(id, {
        img: img,
      })
      .subscribe((_response) => {
        alert(_response.body.message);
        this.getAgeGroups();
        this.topicMedia = _response.body.data;
      });
  }
  enableAddImage() {
    this.isAddImage = !this.isAddImage;
  }

  editAge(row) {
    this.from = row.ageRange[0];
    this.to = row.ageRange[1];
    this.id = row._id;
    this.editable = true; // true for edit operation
    this.isAddAge = true;
  }
}
