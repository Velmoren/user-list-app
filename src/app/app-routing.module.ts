import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {LoginPageComponent} from "./login-page/login-page.component";
import {AuthGuard} from "./guards/auth.guard";

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginPageComponent, canActivate: [AuthGuard]},
  {path: 'users', loadChildren: () => import('./overview-users/overview-users.module').then(m => m.OverviewUsersModule)},
  {path: 'user', loadChildren: () => import('./create-edit-users/create-edit-users.module').then(m => m.CreateEditModule)}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
