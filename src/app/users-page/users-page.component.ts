import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent implements OnInit {

  users = [
    {
      "id": 0,
      "name": "Администратор",
      "email": "admin@test.com",
      "password": "12345678",
      "permission": "admin"
    },
    {
      "id": 1,
      "name": "Пользователь",
      "email": "user@test.com",
      "password": "12345678",
      "permission": "user"
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
