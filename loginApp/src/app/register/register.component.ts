import { Component } from "@angular/core";
import { AuthService } from "../core/auth.service";
import { UserService } from "../core/user.service";
import { Router, Params } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html"
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = "";
  successMessage: string = "";
  userData: Object;
  isStyle: boolean = true;

  constructor(
    public userService: UserService,
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.createForm();
    setTimeout(() => {
      this.loadfunct();
    }, 100);
  }

  loadfunct() {
    this.isStyle = false;
  }

  createForm() {
    this.registerForm = this.fb.group({
      name: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required],
      confirmpassword: ["", Validators.required]
    });
  }

  tryRegister(value) {
    this.authService.doRegister(value).then(
      res => {
        console.log(res);
        this.errorMessage = "";
        this.successMessage = "Your account has been created";
        this.router.navigate(["/login"]);
      },
      err => {
        console.log(err);
        this.errorMessage = err.message;
        this.successMessage = "";
      }
    );
  }
}
