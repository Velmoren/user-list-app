import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EditPageComponent} from "./edit-page.component";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {AuthGuard} from "../guards/auth.guard";
import {AdminGuard} from "../guards/admin.guard";

@NgModule({
  declarations: [
    EditPageComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {path: '', component: EditPageComponent, canActivate: [AuthGuard, AdminGuard]}
    ])
  ],
  exports: [RouterModule]
})
export class EditPageModule { }
