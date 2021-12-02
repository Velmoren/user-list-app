import {Component, OnInit} from '@angular/core';
import {User, UsersService} from "../../services/users.service";
import {LoadingService} from "../../services/loading.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {first, switchMap} from "rxjs";
import {checkPasswords} from "../../helpers/checkPasswords.validator";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {
  submitted: boolean = false

  editUserForm!: FormGroup
  userId: string = ''
  userAvatarFile: any
  imagePath: any
  editUserId?: number

  user: any = {
    id: '',
    name: '',
    email: '',
    permission: '',
    password: '',
  }

  constructor(
    private usersService: UsersService,
    private loading: LoadingService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['id']

    this.editUserForm = new FormGroup({
      name: new FormControl(this.user.name, Validators.required),
      email: new FormControl(this.user.email, [Validators.required, Validators.email]),
      permission: new FormControl(this.user.permission, Validators.required),
      avatar: new FormControl(this.user.avatar),
      password: new FormControl(this.user.password, [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('')
    }, { validators: checkPasswords })

    this.usersService.getUserById(+this.userId)
      .pipe(first())
      .subscribe((user: any) => {
        this.editUserForm.patchValue(user)
        this.userAvatarFile = user.avatar.name
        this.imagePath = user.avatar.link
        this.editUserId = user.id
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

  get avatarStr() {
    return this.editUserForm.get('avatar')
  }

  submit() {
    if (this.editUserForm.invalid) {
      return
    }

    const user: User = this.editUserForm.value

    this.loading.enableLoading()
    this.submitted = true

    this.usersService.updateUser(user, this.editUserId).subscribe(res => {
      this.submitted = false
      this.loading.disableLoading()

      this.toastr.success('User updated!', 'Success!');
      this.router.navigate(['/users'])
    })
  }

  onSelectAvatar(event: any) {
    if(event?.target?.files.length > 0) {
      const reader = new FileReader()
      const file = event?.target?.files[0]
      const type = event?.target?.files[0].type

      this.userAvatarFile = file.name
      this.imagePath = file

      if (type.match(/image\/*/) == null) {
        return alert('Не картинка')
      }

      reader.readAsDataURL(file)
      reader.onload = (_event) => {
        this.imagePath = reader.result

        this.editUserForm.patchValue({
          avatar: {
            link: this.imagePath,
            name: this.userAvatarFile
          }
        })
      }
    }
  }
}
