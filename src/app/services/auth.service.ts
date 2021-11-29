import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {delay} from "rxjs";

export interface User {
  id?: number
  name: string
  email: string
  password: string
  permission: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService{

  private isAuth: boolean = false
  private user?: User

  constructor(
    private http: HttpClient
  ) { }

  login(user: any) {
    return this.http.get(`http://localhost:4201/api/users/_search?email=${user.email}&password=${user.password}`)
  }

  logout() {
    this.isAuth = false
    localStorage.removeItem('user')
  }

  isAuthenticated() {
    return this.isAuth
  }

  saveSession(user: any) {
    this.isAuth = true
    this.user = user
    localStorage.setItem('user', JSON.stringify(user))
  }

  checkAuth() {
    if (localStorage.getItem('user')) {
      this.user = JSON.parse(<string>localStorage.getItem('user'))
      this.isAuth = true
    } else {
      this.isAuth = false
    }
  }

  isAdmin() {
    return this.user?.permission === 'admin'
  }
}
