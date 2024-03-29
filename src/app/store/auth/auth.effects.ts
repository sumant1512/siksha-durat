import { Actions, Effect, ofType } from "@ngrx/effects";
import { AuthService } from "./api/auth.service";
import { Injectable } from "@angular/core";
import {
  AuthActionsUnion,
  AuthActions,
  FetchProfile,
  FetchedProfile,
  ClearProfile,
} from "./auth.actions";
import { mergeMap, map, tap } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable()
export class AuthEffects {
  constructor(
    private action$: Actions<AuthActionsUnion>,
    private authService: AuthService,
    private router: Router
  ) {}

  @Effect()
  userLogin$ = this.action$.pipe(
    ofType(AuthActions.USER_LOGIN),
    map((action) => {
      return this.authService.login(action.payload);
    }),
    mergeMap((response) => {
      return response.pipe(
        map((res) => {
          const authToken = res.headers.get("authToken");
          localStorage.setItem("user_type", res.body["user_type"]);
          localStorage.setItem("AUTH_TOKEN", authToken);
          return new FetchProfile(authToken);
        }),
        tap(() => {
          const userType = localStorage.getItem("user_type");
          if (userType === "Admin") {
            this.router.navigate(["admin/profile"]);
          } else if (userType === "Student") {
            this.router.navigate(["student/profile"]);
          }
        })
      );
    })
  );

  @Effect()
  fetchProfile$ = this.action$.pipe(
    ofType(AuthActions.FETCH_PROFILE),
    map((action) => {
      return this.authService.getProfile(action.payload);
    }),
    mergeMap((response) => {
      return response.pipe(
        map((res) => {
          return new FetchedProfile(res);
        })
      );
    })
  );

  @Effect()
  userLogout$ = this.action$.pipe(
    ofType(AuthActions.USER_LOGOUT),
    tap(() => {
      return this.authService.logout();
    }),
    map(() => {
      return new ClearProfile();
    })
  );
}
