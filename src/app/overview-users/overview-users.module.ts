import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {AuthGuard} from "../guards/auth.guard";
import { UsersPageComponent } from './users-page/users-page.component';
import { UserPageComponent } from './user-page/user-page.component';
import {IsOnlineDirective} from "../directives/isOnline.directive";
import {NameTransformPipe} from "../pipes/name-transform.pipe";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpClient} from "@angular/common/http";
import {HttpLoaderFactory} from "../app.module";

@NgModule({
  declarations: [
    UsersPageComponent,
    UserPageComponent,
    IsOnlineDirective,
    NameTransformPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {path: '', component: UsersPageComponent, canActivate: [AuthGuard]},
      {path: 'details/:id', component: UserPageComponent, canActivate: [AuthGuard]},
    ]),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  exports: [RouterModule, NameTransformPipe]
})
export class OverviewUsersModule { }
