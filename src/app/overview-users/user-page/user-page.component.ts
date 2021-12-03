import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {User, UsersService} from "../../services/users.service";
import {first} from "rxjs";
import {LoadingService} from "../../services/loading.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  userId: string = ''
  user: User = {
    name: '',
    email: '',
    permission: '',
    password: '',
    isOnline: false,
    avatar: {
      link: '',
      name: ''
    },
    skills: []
  }

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    private loading: LoadingService,
    public translate: TranslateService
  ) {
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['id']

    this.getUser()
  }

  getUser() {
    Promise.resolve().then(() => this.loading.enableLoading())

    this.usersService.getUserById(+this.userId)
      .pipe(first())
      .subscribe((user: any) => {
        this.user = user
        Promise.resolve().then(() => this.loading.disableLoading())
      })
  }

}
