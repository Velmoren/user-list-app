import { Component, OnInit } from '@angular/core';
import {UsersService} from "../services/users.service";

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent implements OnInit {

  users: any = []

  constructor(public userService: UsersService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(res => {
      this.users = res
    })
  }

}
