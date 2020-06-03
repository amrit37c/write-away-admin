import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { BlogService } from "src/app/services/blogs/blog.service";
import { Router, ActivationEnd, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-create-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.css"],
})
export class FormComponent implements OnInit {
  blogForm: FormGroup;
  editorData = "<p> </p>";
  editAble: boolean = false;
  updateImage: boolean = false;
  blogImage;
  id;
  uploadFileName: string = "";
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private service: BlogService,
    private router: Router,
    private activateRouter: ActivatedRoute
  ) {}

  ngOnInit() {
    this.blogForm = this.formBuilder.group({
      title: ["", Validators.required],
      content: ["", Validators.required],
      media: ["", Validators.required],
    });

    this.blogForm.patchValue({
      content: this.editorData,
    });

    if (this.activateRouter.snapshot.paramMap.get("id")) {
      // this.editable = true;
      this.editAble = this.activateRouter.snapshot.paramMap.get("id")
        ? true
        : false;

      this.id = this.activateRouter.snapshot.paramMap.get("id");
      this.getDetails(this.id);
    }
    console.log(this.activateRouter.snapshot.paramMap.get("id"));
  }

  get f() {
    return this.blogForm.controls;
  }

  getContent(event) {
    this.editorData = event;
  }

  onSubmit(flag: boolean) {
    console.log("called");
    this.submitted = true;
    if (this.blogForm.invalid) {
      return;
    }

    var form = new FormData();
    form.append("title", this.blogForm.value.title);
    form.append("content", this.editorData);
    form.append("media", this.blogForm.value.media);

    if (flag) {
      form.append("isPublished", "true");
    }

    // edit operation
    if (this.editAble) {
      this.service.put(this.id, form).subscribe((_response) => {
        alert(_response.body.message);
        this.router.navigateByUrl("/blogs");
      });
    } else {
      // insert operation
      this.service.post(form).subscribe((_response) => {
        alert(_response.body.message);
        this.uploadFileName = "";
        this.router.navigateByUrl("/blogs");
      });
    }
  }

  getDetails(id) {
    this.service.getOne(id).subscribe((_response) => {
      console.log("data", _response.body.data);

      this.blogForm.patchValue(_response.body.data);
      this.editorData = _response.body.data.content;
      this.blogImage = _response.body.data.media;
      this.updateImage = true;
    });
  }

  onFileChanged(event) {
    this.uploadFileName = event.target.files[0].name;
    this.blogImage = event.target.files[0];
    this.blogForm.patchValue({
      media: event.target.files[0],
    });
  }

  removeImage() {
    this.blogImage = "";
    this.updateImage = false;
  }

  enableUpload() {
    let element: HTMLElement = document.getElementById("upload") as HTMLElement;
    element.click();
    return;
  }
}
