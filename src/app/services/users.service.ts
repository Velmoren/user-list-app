import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {delay} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get(`http://localhost:4201/api/users`)
  }

  getUserById(id: number) {
    return this.http.get(`http://localhost:4201/api/users/_search?id=${id}`)
  }

  setNewUser(user: any) {
    return this.http.post(`http://localhost:4201/api/users`, user)
  }
}
