import { Component, OnInit } from '@angular/core';
import {UsersService} from "../../services/users.service";
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators, ValidationErrors} from "@angular/forms";
import {LoadingService} from "../../services/loading.service";
import {Route, Router} from "@angular/router";

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})

export class CreatePageComponent implements OnInit {

  createUserForm!: FormGroup
  submitted: boolean = false
  user = {
    name: '',
    email: '',
    permission: '',
    password: '',
    confirmPassword: '',
  }

  constructor(
    private usersService: UsersService,
    private loading: LoadingService,
  ) {}

  ngOnInit(): void {
    this.createUserForm = new FormGroup({
      name: new FormControl(this.user.name, [
        Validators.required
      ]),
      email: new FormControl(this.user.email, [
        Validators.email,
        Validators.required
      ]),
      permission: new FormControl(this.user.permission, [
        Validators.required
      ]),
      password: new FormControl(this.user.password, [
        Validators.required,
        Validators.minLength(6)
      ]),
      confirmPassword: new FormControl(this.user.confirmPassword, [
        Validators.required,
        Validators.minLength(6),
      ])
    })
  }

  get name() {
    return this.createUserForm.get('name');
  }
  get email() {
    return this.createUserForm.get('email');
  }
  get permission() {
    return this.createUserForm.get('permission');
  }
  get password() {
    return this.createUserForm.get('password');
  }
  get confirmPassword() {
    return this.createUserForm.get('confirmPassword');
  }


  submit() {
    if (this.createUserForm.invalid) {
      return
    }
    console.log(this.user)
    this.loading.enableLoading()
    this.submitted = true

    const user = {
      name: this.createUserForm.value.name,
      email: this.createUserForm.value.email,
      password: this.createUserForm.value.password,
      permission: this.createUserForm.value.permission
    }

    this.usersService.setNewUser(user).subscribe(res => {
      this.createUserForm.reset()
      this.submitted = false
      this.loading.disableLoading()
    })
  }
}
