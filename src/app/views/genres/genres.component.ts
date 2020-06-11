import { Component, OnInit, TemplateRef } from "@angular/core";
import { GenreService } from "src/app/services/genre/genre.service";
import { Router } from "@angular/router";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { environment } from "src/environments/environment";
@Component({
  selector: "app-genres",
  templateUrl: "./genres.component.html",
  styleUrls: ["./genres.component.css"],
})
export class GenresComponent implements OnInit {
  url = environment.url;
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
  activeGenre = "";

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
        this.title = "";
        this.getGenres();
      });
  }

  onFileChanged(event, id) {
    const files = event.target.files[0];
    const uploadData = new FormData();
    uploadData.append("topicMedia", files);
    uploadData.append("title", this.title);

    this.service.put(id, uploadData).subscribe((_response) => {
      alert(_response.body.message);
      // this.decline();
      this.getGenres();
      this.isAddImage = false;
      this.topicMedia = _response.body.data;
      this.activeGenre = this.title;
      // this.title = "";
    });
  }

  openModal(template: TemplateRef<any>, imgs) {
    this.activeGenre = imgs.title;
    this.topicMedia = imgs;
    this.title = imgs.title;
    this.modalRef = this.modalService.show(template, this.Modelconfig);
  }

  decline() {
    this.modalRef.hide();
    this.topicMedia = [];
    this.isAddGenre = false;
    this.isAddImage = false;
    this.activeGenre = "";
    this.title = "";
  }

  deleteGenre(id) {
    if (confirm("Do you want to delete this genre?")) {
      this.service.delete(id).subscribe((_response) => {
        alert(_response.body.message);
        this.getGenres();
        // this.topicMedia = _response.body.data;
      });
    }
  }

  deleteOneImg(id, img) {
    if (confirm("Do you want to delete this genre image?")) {
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
  }
  enableAddImage() {
    this.isAddImage = !this.isAddImage;
  }

  chooseImage() {
    let element: HTMLElement = document.getElementById(
      "mediaImage"
    ) as HTMLElement;
    element.click();
  }
}
