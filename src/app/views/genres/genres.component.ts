import { Component, OnInit, TemplateRef } from "@angular/core";
import { GenreService } from "src/app/services/genre/genre.service";
import { Router } from "@angular/router";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";

@Component({
  selector: "app-genres",
  templateUrl: "./genres.component.html",
  styleUrls: ["./genres.component.css"],
})
export class GenresComponent implements OnInit {
  data: Array<any> = [];
  genreAll: boolean = true;
  isAddGenre: boolean = false;
  isAddImage: boolean = false;

  title = "";
  topicMedia = [];
  modalRef: BsModalRef;
  Modelconfig = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: "modelWidth",
  };

  constructor(
    private service: GenreService,
    private router: Router,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    const route = this.router.url.split("/").pop();
    this.getGenres(); // fetch all blogs
  }

  getGenres() {
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
    this.service
      .post({
        title: this.title,
      })
      .subscribe((_response) => {
        console.log(_response);
      });
  }

  onFileChanged(event, id) {
    const files = event.target.files[0];
    const uploadData = new FormData();
    uploadData.append("topicMedia", files);

    this.service.put(id, uploadData).subscribe((_response) => {
      alert(_response.body.message);
      // this.decline();
      this.getGenres();
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
      this.getGenres();
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
        this.getGenres();
        this.topicMedia = _response.body.data;
      });
  }
  enableAddImage() {
    this.isAddImage = !this.isAddImage;
  }
}
