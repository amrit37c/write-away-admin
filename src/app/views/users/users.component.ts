import { Component, OnInit } from "@angular/core";
import { BlogService } from "src/app/services/blogs/blog.service";
import { Router, ActivatedRoute } from "@angular/router";
import { UsersService } from "src/app/services/users/users.service";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"],
})
export class UsersComponent implements OnInit {
  data: Array<any> = [];
  deleteCount = 0;
  blockCount = 0;
  activeCount = 0;
  constructor(private service: UsersService, private router: Router) {}

  ngOnInit() {
    const route = this.router.url.split("/").pop();
    console.log("ex", route);
    let type;
    // type - 1 = saved, 2 = recent, 3 = archieved
    this.get(); // fetch all blogs
  }

  get() {
    this.service.get().subscribe((_response) => {
      this.data = _response.body.data;
      this.activeCount = 0;
      this.deleteCount = 0;
      this.blockCount = 0;
      this.data.forEach((el) => {
        if (el.status === "1") {
          this.activeCount++;
        } else if (el.status === "2") {
          this.deleteCount++;
        } else if (el.status === "0") {
          this.blockCount++;
        }
      });
    });
  }

  updateUser(type, row) {
    let message;

    const update = {};
    if (type == "block") {
      if (row.status === "1") {
        update["status"] = row.status === "1" ? "0" : "1";
        message = "Do you want to block this user";
      } else {
        update["status"] = row.status === "0" ? "1" : "0";
        message = "Do you want to unblock this user";
      }
    } else {
      update["status"] = row.status === "1" ? "2" : "1";
      message = "Do you want to delete this user";
    }
    if (confirm(message)) {
      this.service.put(row.id, update).subscribe((_response) => {
        console.log("respose", _response);
        this.get();
      });
    }
  }
}
