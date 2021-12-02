import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {AuthGuard} from "../guards/auth.guard";
import {AdminGuard} from "../guards/admin.guard";
import { UsersPageComponent } from './users-page/users-page.component';
import { UserPageComponent } from './user-page/user-page.component';
import {IsOnlineDirective} from "./directives/isOnline.directive";

@NgModule({
  declarations: [
    UsersPageComponent,
    UserPageComponent,
    IsOnlineDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {path: '', component: UsersPageComponent, canActivate: [AuthGuard]},
      {path: 'details/:id', component: UserPageComponent, canActivate: [AuthGuard]},
    ])
  ],
  exports: [RouterModule]
})
export class OverviewUsersModule { }
