import { Component, OnInit, TemplateRef } from "@angular/core";
import { GenreService } from "src/app/services/genre/genre.service";
import { Router } from "@angular/router";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { AgeGroupService } from "src/app/services/age-group/age-group.service";

@Component({
  selector: "app-age-group",
  templateUrl: "./age-group.component.html",
  styleUrls: ["./age-group.component.css"],
})
export class AgeGroupComponent implements OnInit {
  data: Array<any> = [];
  genreAll: boolean = true;
  isAddGenre: boolean = false;
  isAddImage: boolean = false;

  from = "";
  to = "";
  topicMedia = [];
  modalRef: BsModalRef;
  Modelconfig = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: "modelWidth",
  };

  constructor(
    private service: AgeGroupService,
    private router: Router,
    private modalService: BsModalService
  ) {}

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

  enableAddGenre() {
    this.isAddGenre = !this.isAddGenre;
  }

  addGenre() {
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
        console.log(_response);
        alert(_response.body.message);
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

  openModal(template: TemplateRef<any>, imgs) {
    this.topicMedia = imgs;
    this.modalRef = this.modalService.show(template, this.Modelconfig);
  }

  decline() {
    this.modalRef.hide();
    this.topicMedia = [];
    this.isAddGenre = false;
    this.isAddImage = false;
  }

  deleteGenre(id) {
    this.service.delete(id).subscribe((_response) => {
      alert(_response.body.message);
      this.getAgeGroups();
      // this.topicMedia = _response.body.data;
    });
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
}
