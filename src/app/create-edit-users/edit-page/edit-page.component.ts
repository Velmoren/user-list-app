import {Component, OnInit} from '@angular/core';
import {UsersService} from "../../services/users.service";
import {LoadingService} from "../../services/loading.service";
import {ActivatedRoute} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {first, switchMap} from "rxjs";
import {MustMatch} from '../../helpers/must-match.validator';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {
  submitted: boolean = false

  editUserForm!: FormGroup
  userId: string = ''

  user: any = {
    name: '',
    email: '',
    permission: '',
    password: '',
  }

  constructor(
    private usersService: UsersService,
    private loading: LoadingService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['id']

    this.editUserForm = new FormGroup({
      name: new FormControl(this.user.name, Validators.required),
      email: new FormControl(this.user.email, [Validators.required, Validators.email]),
      permission: new FormControl(this.user.permission, Validators.required),
      password: new FormControl(this.user.password, [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
    })

    this.usersService.getUserById(+this.userId)
      .pipe(first())
      .subscribe(user => {
        this.editUserForm.patchValue(user)
      })
  }

  passwordMatchValidator(frm: FormGroup) {
    return frm.controls['password'].value ===
    frm.controls['confirmPassword'].value ? null : {'mismatch': true};
  }

  get name() {
    return this.editUserForm.get('name');
  }

  get email() {
    return this.editUserForm.get('email');
  }

  get permission() {
    return this.editUserForm.get('permission');
  }

  get password() {
    return this.editUserForm.get('password');
  }

  get confirmPassword() {
    return this.editUserForm.get('confirmPassword');
  }


  submit() {
    if (this.editUserForm.invalid) {
      return
    }
    console.log(this.editUserForm.value)
    this.loading.enableLoading()
    this.submitted = true

    this.usersService.updateUser(this.editUserForm.value).subscribe(res => {
      this.submitted = false
      this.loading.disableLoading()
    })
  }


}
