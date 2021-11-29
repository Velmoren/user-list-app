import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CreatePageComponent} from "./create-page.component";
import {RouterModule} from "@angular/router";
import {AuthGuard} from "../guards/auth.guard";
import {AdminGuard} from "../guards/admin.guard";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    CreatePageComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {path: '', component: CreatePageComponent, canActivate: [AuthGuard, AdminGuard]}
    ])
  ],
  exports: [RouterModule]
})
export class CreatePageModule { }
