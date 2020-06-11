import { Component, OnInit, TemplateRef } from "@angular/core";
import { BlogService } from "src/app/services/blogs/blog.service";
import { Router, ActivatedRoute } from "@angular/router";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-blogs",
  templateUrl: "./blogs.component.html",
  styleUrls: ["./blogs.component.css"],
})
export class BlogsComponent implements OnInit {
  url = environment.url;
  data: Array<any> = [];
  allBlogs = [];
  blogAll: boolean = true;
  currentBlog: string = "Active";

  activeBlogs: Array<any> = [];
  recentBlogs: Array<any> = [];
  archivedBlogs: Array<any> = [];
  recentCount: number = 0;
  archieveCount: number = 0;
  activeBlog;
  modalRef: BsModalRef;
  Modalconfig = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: "modelWidth",
  };
  stats: Array<any> = [];
  shareStats;
  allBlogCount = 0;
  avrReads = 0;
  avrLikes = 0;
  avrShare = 0;
  avgCopiesLink = 0;

  constructor(
    private service: BlogService,
    private router: Router,
    private modalService: BsModalService
  ) {
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

          this.allBlogCount = _response.body.allBlog;
          this.avrReads = _response.body.avrReads;
          this.avrLikes = _response.body.avrLikes;
          this.avrShare = _response.body.avrShare;
          this.avgCopiesLink = _response.body.avgCopiesLink;
          console.log("allBlogCount", this.allBlogCount);

          this.activeBlog = _response.body.data.id;
          this.data.push(_response.body.data);

          this.archivedBlogs = [].concat(_response.body.blogData);

          const allBlog = [].concat(_response.body.blogData);

          this.recentBlogs = allBlog.slice(0, 2);
          console.log("After ", _response.body.blogData);
          this.archivedBlogs.splice(0, 2);
        }
      });
    } else {
      this.getActiveBlog();
      this.service.get(type).subscribe((_response) => {
        if (_response.body.status !== "Failure") {
          this.data = [];
          this.data = _response.body.data;

          this.data = this.data.filter((el) => el._id != this.activeBlog);

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

  getActiveBlog() {
    this.service.getHomeBlog().subscribe((_response) => {
      this.activeBlog = _response.body.data.id;
      console.log("active", this.activeBlog);
    });
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

  openModal(template: TemplateRef<any>, type, row) {
    if (type == "read") {
      // this.stats = row;
    }

    this.stats.push(row);
    this.modalRef = this.modalService.show(template, this.Modalconfig);
  }

  decline() {
    this.modalRef.hide();
  }
}
