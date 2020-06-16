import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { PublicationService } from "src/app/services/publications/publication.service";
import { GenreService } from "src/app/services/genre/genre.service";
import { AgeGroupService } from "src/app/services/age-group/age-group.service";

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.css"],
})
export class FormComponent implements OnInit {
  publicationForm: FormGroup;
  publicationRights: Array<any> = [
    {
      name: "Open for All",
      value: 1,
    },
    {
      name: "Open for self",
      value: 2,
    },
    {
      name: "Open for invitees only",
      value: 3,
    },
  ];

  languages: Array<any> = [
    {
      name: "English",
      value: 1,
    },
    {
      name: "Hindi",
      value: 2,
    },
  ];

  // 1 - text, 2 - Image, 3 - Video, 4 - Audio
  categories: Array<any> = [
    {
      name: "Text",
      value: 1,
    },
    {
      name: "Image",
      value: 2,
    },
    {
      name: "Video",
      value: 3,
    },
    {
      name: "Audio",
      value: 4,
    },
  ];

  commercials: Array<any> = [
    {
      name: "Free writing- Free reading",
      value: 1,
    },
    {
      name: "Paid writing- Free reading",
      value: 2,
    },
    {
      name: "Free writing- Paid reading",
      value: 3,
    },
    {
      name: "Paid writing- Paid reading",
      value: 4,
    },
  ];

  genres = [];
  ageGroups = [];
  genresInput = [];
  genresDesc = [];
  genresDec: FormArray;
  genreSelected: number = 0;
  currentDate = new Date().toJSON().slice(0, 10).replace(/-/g, "-");
  openPub: number = 0;
  savedPub: number = 0;
  closedPub: number = 0;
  json = null;
  sort = {
    title: 1,
  };

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private publicationService: PublicationService,
    private ageGroupService: AgeGroupService,
    private genreService: GenreService
  ) {}

  ngOnInit() {
    this.getAgeGroup(); // get age groups
    this.getGenres(); // get genres
    this.getHomePublication(); // get stats for home

    this.publicationForm = this.formBuilder.group({
      title: [""],
      brief: [""],
      genres: [""],
      // genreDescription: [""],
      closingDate: [""],
      ageGroup: [""],
      kickstarter: [""],
      kickbookDesc: [""],
      mediaCover: [""],
      wordCountMin: [""],
      wordCountMax: [""],
      publicationRights: [""],
      commercials: [""],
      language: [""],
      category: [""],
      categoryContent: [""],
      genreDescription: this.formBuilder.array([]),
    });

    this.genresDec = this.publicationForm.get("genreDescription") as FormArray;
  }

  getHomePublication() {
    this.publicationService.getPublicationStats().subscribe((_response) => {
      this.openPub = _response.body.open;
      this.closedPub = _response.body.closed;
      this.savedPub = _response.body.saved;
    });
  }
  createItem(): FormGroup {
    return this.formBuilder.group({
      desc: "",
    });
  }

  addGenreDesc(): void {
    if (
      this.publicationForm.value.genres &&
      this.publicationForm.value.genres.length > 0
    ) {
      for (let i = 0; i < this.genreSelected; i++) {
        this.genresDec.removeAt(i);
      }
      this.genreSelected = this.publicationForm.value.genres.length;

      for (let i = 0; i < this.publicationForm.value.genres.length; i++) {
        this.genresDec = this.publicationForm.get(
          "genreDescription"
        ) as FormArray;
        this.genresDec.push(this.createItem());
      }
    }
  }

  deletePackage(pos) {
    this.genresDec.removeAt(pos);
  }

  onSubmit(type?) {
    if (this.publicationForm.invalid) {
      return;
    }
    const json = this.publicationForm.value;

    if (type) {
      json.publicationStatus = 2;
    }
    json.wordCount = [json.wordCountMin, json.wordCountMax];
    let desc = [];
    json.genreDescription.forEach((el) => {
      desc.push(el.desc);
    });

    json.genreDescription = desc;

    const formdata = new FormData();
    const data = this.getFormFields(json, formdata);

    this.publicationService.post(data).subscribe((_response) => {
      this.publicationForm.reset();
      this.router.navigateByUrl("/publications");
    });
  }

  onFileChanged(event, field) {
    if (field === "mediaCover") {
      this.publicationForm.patchValue({
        mediaCover: event.target.files[0],
      });
    } else {
      this.publicationForm.patchValue({
        categoryContent: event.target.files[0],
      });
    }
  }

  onChange($event) {
    this.genresInput.forEach((el) => {
      this.genresDesc.push({ value: "" });
    });
  }

  removeImage() {
    // this.blogImage = "";
    // this.updateImage = false;
  }

  getAgeGroup() {
    this.ageGroupService.get().subscribe((_response) => {
      console.log("");
      this.ageGroups = _response.body.data.map((el) => {
        return {
          value: el._id,
          name: el.ageRange,
        };
      });
    });
  }

  getGenres() {
    this.genreService.get(this.json, this.sort).subscribe((_response) => {
      this.genres = _response.body.data.map((el) => {
        return {
          value: el._id,
          name: el.title,
        };
      });
    });
  }

  getFormFields(formdata, obj) {
    for (const field in formdata) {
      obj.append(field, formdata[field]);
    }
    return obj;
  }
}
