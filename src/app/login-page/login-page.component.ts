import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {LoadingService} from "../services/loading.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  loginForm!: FormGroup
  submitted: boolean = false

  constructor(
    public auth: AuthService,
    private router: Router,
    private loading: LoadingService
  ) { }

  ngOnInit(): void {
    if(this.auth.isAuthenticated()) {
      this.router.navigate(['/users'])
    }

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

    this.loading.enableLoading()
    this.submitted = true

    const user = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }

    this.auth.login(user).subscribe((res: any) => {
      this.submitted = false

      if (res.length) {
        this.loginForm.reset()
        this.router.navigate(['/users'])
        this.auth.saveSession(res[0])

      }

      this.loading.disableLoading()
    }, (error: string) => {
      this.submitted = false
      this.loading.disableLoading()
    })
  }

}
