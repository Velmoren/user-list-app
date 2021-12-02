import {Component, OnInit} from '@angular/core';
import {User, UsersService} from "../../services/users.service";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {LoadingService} from "../../services/loading.service";
import {checkPasswords} from "../../helpers/checkPasswords.validator";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {checkDates} from "../../helpers/checkDates.validator";

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['../create-edit-users.scss']
})

export class CreatePageComponent implements OnInit {

  createUserForm!: FormGroup
  submitted: boolean = false
  userAvatarFile: any
  imagePath: any

  constructor(
    private usersService: UsersService,
    private loading: LoadingService,
    private toastr: ToastrService,
    private router: Router,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.createUserForm = new FormGroup({
      name: new FormControl('', [
        Validators.required
      ]),
      email: new FormControl(this.userAvatarFile, [
        Validators.email,
        Validators.required
      ]),
      permission: new FormControl('', [
        Validators.required
      ]),
      avatar: new FormControl(''),
      skills: new FormArray([]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ]),
      confirmPassword: new FormControl([''])
    }, {validators: checkPasswords})
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

  get avatar() {
    return this.createUserForm.get('avatar');
  }

  get password() {
    return this.createUserForm.get('password');
  }

  get confirmPassword() {
    return this.createUserForm.get('confirmPassword');
  }

  get skills() {
    return this.createUserForm.get('skills');
  }

  get skillsControls() {
    return <FormArray>this.createUserForm.get('skills');
  }

  submit() {
    if (this.createUserForm.invalid) {
      return
    }

    this.loading.enableLoading()
    this.submitted = true

    const user: User = {
      name: this.createUserForm.value.name,
      email: this.createUserForm.value.email,
      password: this.createUserForm.value.password,
      permission: this.createUserForm.value.permission,
      isOnline: false,
      avatar: {
        link: this.imagePath,
        name: this.userAvatarFile
      },
      skills: [
        ...this.createUserForm.value.skills
      ]
    }

    this.usersService.setNewUser(user).subscribe(res => {
      this.createUserForm.reset()
      this.submitted = false
      this.userAvatarFile = null
      this.imagePath = null
      this.loading.disableLoading()

      this.toastr.success('User created!', 'Success!');
      this.router.navigate(['/users'])
    })
  }

  onSelectAvatar(event: any) {
    if (event?.target?.files.length > 0) {
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

        this.createUserForm.patchValue({
          avatar: {
            link: this.imagePath,
            name: this.userAvatarFile
          }
        })
      }
    }
  }

  removeSkillsGroup(id: number) {
    this.skillsControls.removeAt(id)
  }

  addSkillGroup() {
    if (this.skillsControls.controls.length < 3) {
      const control = new FormGroup({
        name: new FormControl(''),
        startAge: new FormControl(''),
        endAge: new FormControl('')
      },{
        validators: checkDates
      })

      this.skillsControls.push(control)
    } else {
      alert('Добавлено максимум полей')
    }
  }
}
