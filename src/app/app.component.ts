import {Component, OnInit} from '@angular/core';
import {AuthService} from "./services/auth.service";
import {Router} from "@angular/router";
import {LoadingService} from "./services/loading.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  public isCollapsed = true;

  constructor(
    public auth: AuthService,
    private router: Router,
    public loading: LoadingService
  ) {}

  logout(event: Event) {
    event.preventDefault()
    this.router.navigate(['/'])
    this.auth.logout()
  }

  ngOnInit(): void {
    this.auth.checkAuth()
  }
}
