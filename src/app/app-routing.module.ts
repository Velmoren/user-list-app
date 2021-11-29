import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UsersPageComponent} from "./users-page/users-page.component";
import {LoginPageComponent} from "./login-page/login-page.component";
import {UserPageComponent} from "./user-page/user-page.component";
import {CreatePageComponent} from "./create-page/create-page.component";
import {AuthGuard} from "./guards/auth.guard";

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginPageComponent},
  {path: 'users', component: UsersPageComponent, canActivate: [AuthGuard]},
  {path: 'users/:id', component: UserPageComponent, canActivate: [AuthGuard]},
  {path: 'create', component: CreatePageComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
