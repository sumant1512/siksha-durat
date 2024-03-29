import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ResetPasswordRoutingModule } from "./reset-password-routing.module";
import { ResetPasswordComponent } from "./reset-password.component";
import { HomeModule } from "../+home/home.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [ResetPasswordComponent],
  imports: [
    CommonModule,
    ResetPasswordRoutingModule,
    HomeModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class ResetPasswordModule {}
