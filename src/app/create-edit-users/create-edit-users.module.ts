import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {AuthGuard} from "../guards/auth.guard";
import {AdminGuard} from "../guards/admin.guard";
import { EditPageComponent } from './edit-page/edit-page.component';
import { CreatePageComponent } from './create-page/create-page.component';

@NgModule({
  declarations: [
    CreatePageComponent,
    EditPageComponent,
   
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {path: 'edit/:id', component: EditPageComponent, canActivate: [AuthGuard, AdminGuard]},
      {path: 'create', component: CreatePageComponent, canActivate: [AuthGuard, AdminGuard]},
    ])
  ],
  exports: [RouterModule]
})
export class CreateEditModule { }
