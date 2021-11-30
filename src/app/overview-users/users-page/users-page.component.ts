import {Component, OnInit} from '@angular/core';
import {UsersService} from "../../services/users.service";
import {LoadingService} from "../../services/loading.service";

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent implements OnInit {

  users: any = []

  constructor(
    public userService: UsersService,
    private loading: LoadingService
  ) { }

  ngOnInit(): void {
    Promise.resolve().then(() => this.loading.enableLoading())

    this.userService.getUsers().subscribe(res => {
      this.users = res
      Promise.resolve().then(() => this.loading.disableLoading())
    })
  }
}
