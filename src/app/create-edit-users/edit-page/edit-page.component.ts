import {Component, OnInit} from '@angular/core';
import {Skill, User, UsersService} from "../../services/users.service";
import {LoadingService} from "../../services/loading.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {first} from "rxjs";
import {checkPasswords} from "../../helpers/checkPasswords.validator";
import {ToastrService} from "ngx-toastr";
import {checkDates} from "../../helpers/checkDates.validator";

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['../create-edit-users.scss']
})
export class EditPageComponent implements OnInit {
  submitted: boolean = false

  editUserForm!: FormGroup
  userId: string = ''
  userAvatarFile: any
  imagePath: any
  editUserId?: number
  userIsOnline: boolean = false

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
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['id']

    this.editUserForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      permission: new FormControl('', Validators.required),
      avatar: new FormControl(''),
      skills: new FormArray([]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('')
    }, { validators: checkPasswords })

    this.usersService.getUserById(+this.userId)
      .pipe(first())
      .subscribe((user: any) => {
        this.editUserForm.patchValue(user)
        this.userAvatarFile = user.avatar.name
        this.imagePath = user.avatar.link
        this.editUserId = user.id
        this.userIsOnline = user.isOnline

        this.skillsControls.removeAt(0)

        user.skills?.forEach((skill: Skill) => {
          const control = new FormGroup({
            name: new FormControl(skill.name),
            startAt: new FormControl(skill.startAt),
            endAt: new FormControl(skill.endAt)
          })

          this.skillsControls.push(control)
        })
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

  get skills() {
    return this.editUserForm.get('skills');
  }

  get skillsControls() { return <FormArray>this.editUserForm.get('skills'); }

  submit() {
    if (this.editUserForm.invalid) {
      return
    }

    const user: User = {
      name: this.editUserForm.value.name,
      email: this.editUserForm.value.email,
      password: this.editUserForm.value.password,
      permission: this.editUserForm.value.permission,
      isOnline: this.userIsOnline,
      avatar: {
        link: this.imagePath,
        name: this.userAvatarFile
      },
      skills: [
        ...this.editUserForm.value.skills
      ]
    }

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

  removeSkillsGroup(id: number) {
    this.skillsControls.removeAt(id)
  }

  addSkillGroup() {
    if (this.skillsControls.controls.length < 3) {
      const control = new FormGroup({
        name: new FormControl(''),
        startAt: new FormControl(''),
        endAt: new FormControl('')
      },{
        validators: checkDates
      })

      this.skillsControls.push(control)
    } else {
      alert('Добавлено максимум полей')
    }
  }
}
