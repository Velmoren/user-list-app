import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  loginForm!: FormGroup
  submitted: boolean = false

  constructor() { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.email,
        Validators.required,
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ]),
    })
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  submit() {
    if (this.loginForm.invalid) {
      return
    }

    this.submitted = true

    const user = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }

    console.log(user)
  }

}
