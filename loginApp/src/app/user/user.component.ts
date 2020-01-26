import { Component, OnInit } from "@angular/core";
import { UserService } from "../core/user.service";
import { AuthService } from "../core/auth.service";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { FirebaseUserModel } from "../core/user.model";
import { Router, Params } from "@angular/router";
import { resolve } from "url";

@Component({
  selector: "page-user",
  templateUrl: "user.component.html"
})
export class UserComponent implements OnInit {
  user: FirebaseUserModel = new FirebaseUserModel();
  profileForm: FormGroup;
  userName: string;
  isStyle: boolean = true;

  constructor(
    public userService: UserService,
    public authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder
  ) {
    setTimeout(() => {
      this.loadfunct();
    }, 200);
  }

  loadfunct() {
    this.isStyle = false;
  }

  ngOnInit(): any {
    this.route.data.subscribe(routeData => {
      let data = routeData["data"];
      if (data) {
        this.user = data;
        console.log(JSON.stringify(this.userName));
      }
    });
  }

  logout() {
    this.authService.doLogout().then(
      res => {
        this.router.navigate(["/login"]);
      },
      error => {
        console.log("Logout error", error);
      }
    );
  }
}
