import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, catchError, throwError } from "rxjs";
import { AlertifyService } from "./alertify.service";
import { Injectable } from "@angular/core";


@Injectable({
  providedIn: 'root'
})

export class HttpErrorInterceptorService implements HttpInterceptor {

  constructor(private alertify: AlertifyService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('HTTP Request Started');
    return next.handle(req)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          const errorMessage = this.setError(error)
          console.log(error);
          this.alertify.error(errorMessage);
          return throwError(errorMessage);
        })
      );
  }

  setError(error: HttpErrorResponse): string {
    let errorMessage = 'Unknown Error Occured';
    if (error.error instanceof ErrorEvent) {
      //Client side error
      errorMessage = error.error.message;
    } else {
      //server side error
      if (error.status !== 0) {
        errorMessage = error.error.errorMessage;
      }
    }
    return errorMessage;
  }
}
