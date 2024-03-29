import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { HttpErrorInterceptor } from './http-error.interceptor';

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeModule } from "./+home/home.module";
import { AdminModule } from "./+admin/admin.module";
import { SharedModule } from "./shared/shared.module";
import { RegistrationModule } from "./+registration/registration.module";
import { SchoolVerificationModule } from "./+school-verification/school-verification.module";

import { appReducers } from "./store/app.reducers";
import { AppEffects } from "./store/app.effects";
import { ResetPasswordModule } from "./+reset-password/reset-password.module";
import { StudentModule } from "./+student/student.module";
import { SuperAdminModule } from './+super-admin/super-admin.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    HomeModule,
    AdminModule,
    SharedModule,
    RegistrationModule,
    SchoolVerificationModule,
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([...AppEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 10,
    }),
    ResetPasswordModule,
    StudentModule,
    SuperAdminModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpErrorInterceptor,
    multi: true

  }],
  bootstrap: [AppComponent],
})
export class AppModule { }
