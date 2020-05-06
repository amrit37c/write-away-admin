import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-create-blog",
  templateUrl: "./create-blog.component.html",
  styleUrls: ["./create-blog.component.css"],
})
export class CreateBlogComponent implements OnInit {
  blogForm: FormGroup;
  editorData = "<h1>hi</h1>";
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.blogForm = this.formBuilder.group({
      title: ["", Validators.required],
      content: ["", Validators.required],
      media: ["", Validators.required],
    });

    this.blogForm.patchValue({
      content: this.editorData,
    });
  }

  getContent(event) {
    console.log("data", event);
  }

  onSubmit() {
    if (this.blogForm.invalid) {
      return;
    }
    this.blogForm.patchValue({
      content: this.editorData,
    });
    console.log("this.b", this.blogForm);
  }

  onFileChanged(event) {
    this.blogForm.patchValue({
      media: event.target.files[0],
    });
  }
}
