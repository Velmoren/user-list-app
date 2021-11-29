import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UsersPageComponent} from "./users-page/users-page.component";
import {LoginPageComponent} from "./login-page/login-page.component";
import {UserPageComponent} from "./user-page/user-page.component";

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'users', component: UsersPageComponent},
  {path: 'users/:id', component: UserPageComponent},
  {path: 'login', component: LoginPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
