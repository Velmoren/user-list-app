import {Component, OnInit} from '@angular/core';
import {User, UsersService} from "../../services/users.service";
import {LoadingService} from "../../services/loading.service";
import {AuthService} from "../../services/auth.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent implements OnInit {

  users: any = []
  isOnline = true
  searchStr: string = ''
  userByDelete?: User

  constructor(
    public auth: AuthService,
    public userService: UsersService,
    private loading: LoadingService,
    private toastr: ToastrService,
    private router: Router,
    public translate: TranslateService,
    private modalService: NgbModal,
  ) {}

  ngOnInit(): void {
    this.getUsers()
  }

  getUsers() {
    Promise.resolve().then(() => this.loading.enableLoading())

    this.userService.getUsers().subscribe(res => {
      this.users = res
      Promise.resolve().then(() => this.loading.disableLoading())
    })
  }

  renderUsersFromSearch() {
    return this.searchStr ?
      this.users.filter((user: User) => user.name.includes(this.searchStr) || user.email.includes(this.searchStr)) :
      this.users
  }

  deleteUser(user: any) {
    if(!user.superAdmin) {
      Promise.resolve().then(() => this.loading.enableLoading())

      this.userService.deleteUser(user.id).subscribe(() => {
        this.getUsers()

        Promise.resolve().then(() => this.loading.disableLoading())

        this.toastr.success('User deleted!', 'Success!');
      })
    } else {
      alert('Данного пользователя удалить нельзя!')
    }
  }

  inputSearch(event: any) {
    this.searchStr = event.target.value
  }

  modalOpen(content: any, user: any) {
    this.userByDelete = user
    this.modalService.open(content)
  }

  modalSave() {
    this.deleteUser(this.userByDelete)
  }
}
