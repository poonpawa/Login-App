import { Component } from "@angular/core";
import { AuthService } from "../core/auth.service";
import { Router, Params } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "page-login",
  templateUrl: "login.component.html"
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = "";
  isStyle: boolean = true;

  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.createForm();
    setTimeout(() => {
      this.loadfunct();
    }, 200);
  }

  loadfunct() {
    this.isStyle = false;
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  tryLogin(value) {
    this.authService.doLogin(value).then(
      res => {
        this.router.navigate(["/user"]);
      },
      err => {
        console.log(err);
        this.errorMessage = err.message;
      }
    );
  }
}
