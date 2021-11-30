import {Component, OnInit} from '@angular/core';
import {UsersService} from "../../services/users.service";
import {LoadingService} from "../../services/loading.service";
import {ActivatedRoute, Router} from "@angular/router";
import {switchMap} from "rxjs";
import {User} from "../../services/auth.service";

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {

  user = {}

  constructor(
    private userService: UsersService,
    private loading: LoadingService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    Promise.resolve().then(() => this.loading.enableLoading())

    this.route.params.pipe(switchMap(params => {
      return this.userService.getUserById(params['id'])
    })).subscribe(user => {
      this.user = user
      Promise.resolve().then(() => this.loading.disableLoading())
    })
  }
}
