import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {UsersPageComponent} from "./users-page/users-page.component";
import {LoginPageComponent} from "./login-page/login-page.component";
import {UserPageComponent} from "./user-page/user-page.component";
import {CreatePageComponent} from "./create-page/create-page.component";
import {AuthGuard} from "./guards/auth.guard";
import {AdminGuard} from "./guards/admin.guard";

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginPageComponent},
  {path: 'users', component: UsersPageComponent, canActivate: [AuthGuard]},
  {path: 'users/:id', component: UserPageComponent, canActivate: [AuthGuard]},
  {path: 'create', loadChildren: () => import('./create-page/create-page.module').then(m => m.CreatePageModule)},
  {path: 'edit/:id', loadChildren: () => import('./edit-page/edit-page.module').then(m => m.EditPageModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
