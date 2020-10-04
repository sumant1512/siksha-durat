import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { retry, catchError, tap } from "rxjs/operators";
import { ErrorNotificationService } from "./store/services/error-notification.service";

export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private errorService: ErrorNotificationService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap((data) => {
        if (data instanceof HttpResponse) {
          let successMessage: string;
          successMessage = "Success";
          this.errorService.addSuccess(successMessage);
          return throwError(successMessage);
        }
      }),
      retry(1),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = "";
        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        this.errorService.addErrors(errorMessage);
        return throwError(errorMessage);
      })
    );
  }
}
