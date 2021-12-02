import {Component, OnInit} from '@angular/core';
import {UsersService} from "../../services/users.service";
import {LoadingService} from "../../services/loading.service";
import {AuthService} from "../../services/auth.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent implements OnInit {

  users: any = []

  constructor(
    public auth: AuthService,
    public userService: UsersService,
    private loading: LoadingService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getUsers()
  }

  getUsers() {
    Promise.resolve().then(() => this.loading.enableLoading())

    this.userService.getUsers().subscribe(res => {
      this.users = res
      Promise.resolve().then(() => this.loading.disableLoading())
    })
  }

  deleteUser(user: any) {
    if(!user.superAdmin) {
      if (confirm(`Вы точно хотите удалить пользователя ${user.name}?`)) {
        Promise.resolve().then(() => this.loading.enableLoading())

        this.userService.deleteUser(user.id).subscribe(res => {
          this.getUsers()

          Promise.resolve().then(() => this.loading.disableLoading())

          this.toastr.success('User deleted!', 'Success!');
        })
      }
    } else {
      alert('Данного пользователя удалить нельзя!')
    }
  }
}
