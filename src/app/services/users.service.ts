import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

export interface Avatar {
  link: string,
  name: string
}

export interface Skill {
  name: string,
  startAt: Date,
  endAt: Date
}

export interface User {
  name: string
  email: string
  permission: string
  password: string
  isOnline: boolean
  avatar: Avatar
  skills: Skill[]
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get(`http://localhost:4201/users`)
  }

  getUserById(id: number) {

    return this.http.get(`http://localhost:4201/users/${id}`)
  }

  setNewUser(user: User) {
    return this.http.post(`http://localhost:4201/users`, user)
  }

  updateUser(user: User, id: any) {
    return this.http.put(`http://localhost:4201/users/${id}`, user)
  }

  deleteUser(id: any) {
    return this.http.delete(`http://localhost:4201/users/${id}`)
  }
}
