import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

export interface User {
  name: string
  email: string
  permission: string
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get(`http://localhost:4201/api/users`)
  }

  getUserById(id: number) {

    return this.http.get(`http://localhost:4201/api/users/${id}`)
  }

  setNewUser(user: any) {
    return this.http.post(`http://localhost:4201/api/users`, user)
  }

  updateUser(user: any) {
    return this.http.put(`http://localhost:4201/api/users/${user.id}`, user)
  }
}
