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
  allBlogs = [];
  blogAll: boolean = true;
  currentBlog: string = "Active";

  activeBlogs: Array<any> = [];
  recentBlogs: Array<any> = [];
  archivedBlogs: Array<any> = [];
  recentCount: number = 0;
  archieveCount: number = 0;

  constructor(private service: BlogService, private router: Router) {
    // console.log("ex", this.router.url);
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
    // this.getRecentBlog(); // fetch recent blogs
  }

  getBlogs(type?) {
    if (this.blogAll) {
      this.service.getHomeBlog().subscribe((_response) => {
        if (_response.body.status !== "Failure") {
          this.data = [];
          this.data.push(_response.body.data);

          this.archivedBlogs = [].concat(_response.body.blogData);

          const allBlog = [].concat(_response.body.blogData);

          this.recentBlogs = allBlog.slice(0, 2);
          console.log("After ", _response.body.blogData);
          this.archivedBlogs.splice(0, 2);
        }
      });
    } else {
      this.service.get(type).subscribe((_response) => {
        if (_response.body.status !== "Failure") {
          this.data = [];
          this.data = _response.body.data;
          const data = _response.body.data;
          if (this.currentBlog === "Recent") {
            this.data = this.data.slice(0, 2);
          } else if (this.currentBlog === "Archieved") {
            this.data.splice(0, 2);
          }
        }
      });
    }
  }

  editBlog(id) {
    // this.router.navigateByUrl("/edit/" + id);
    this.router.navigate(["/blogs/edit-blog/" + id]);
  }

  publishBlog(id) {
    this.service
      .put(id, { isPublished: true, activeBlog: true })
      .subscribe((_response) => {
        console.log("", _response);
        this.getBlogs("saved-blog");
      });
  }

  getRecentBlog() {
    this.service.get({ isPublished: "today" }).subscribe((_response) => {
      this.recentBlogs = _response.body.data;
    });
  }
  delete(id) {
    this.service.put(id, { isDeleted: true }).subscribe((_response) => {
      console.log("", _response);
      this.getBlogs("saved-blog");
    });
  }
}
