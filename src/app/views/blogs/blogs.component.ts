import { Component, OnInit } from "@angular/core";
import { BlogService } from "src/app/services/blogs/blog.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-blogs",
  templateUrl: "./blogs.component.html",
  styleUrls: ["./blogs.component.css"],
})
export class BlogsComponent implements OnInit {
  data: Array<any> = [];
  blogAll: boolean = true;
  currentBlog: string = "Active";

  activeBlogs: Array<any> = [];
  recentBlogs: Array<any> = [];
  archivedBlogs: Array<any> = [];

  constructor(private service: BlogService, private router: Router) {
    console.log("ex", this.router.url);
  }

  ngOnInit() {
    const route = this.router.url.split("/").pop();
    console.log("ex", route);
    let type;
    // type - 1 = saved, 2 = recent, 3 = archieved
    if (route === "blogs") {
      this.blogAll = true;
      this.currentBlog = "Active";
    } else if (route == "saved-blog") {
      type = 1;
      this.blogAll = false;
      this.currentBlog = "Saved";
    } else if (route == "recent-blog") {
      this.blogAll = false;
      this.currentBlog = "Recent";
    } else {
      this.blogAll = false;
      this.currentBlog = "Archieved";
    }

    this.getBlogs(route); // fetch all blogs
  }

  getBlogs(type?) {
    this.service.get(type).subscribe((_response) => {
      this.data = _response.body.data;
    });
  }

  editBlog(id) {
    // this.router.navigateByUrl("/edit/" + id);
    this.router.navigate(["/blogs/edit-blog/" + id]);
  }

  publishBlog(id) {
    this.service.put(id, { isPublished: true }).subscribe((_response) => {
      console.log("", _response);
      this.getBlogs("saved-blog");
    });
  }
}
