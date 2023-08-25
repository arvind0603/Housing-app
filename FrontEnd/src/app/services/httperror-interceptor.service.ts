import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, catchError, concat, concatMap, of, retry, retryWhen, throwError } from "rxjs";
import { AlertifyService } from "./alertify.service";
import { Injectable } from "@angular/core";
import { ErrorCode } from "../enums/enums";


@Injectable({
  providedIn: 'root'
})

export class HttpErrorInterceptorService implements HttpInterceptor {

  constructor(private alertify: AlertifyService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('HTTP Request Started');
    return next.handle(req)
      .pipe(
        retryWhen(error => this.retryRequest(error, 10)),
        catchError((error: HttpErrorResponse) => {
          const errorMessage = this.setError(error)
          console.log(error);
          this.alertify.error(errorMessage);
          return throwError(errorMessage);
        })
      );
  }

  //Retry the request in case of Error
  retryRequest(error: Observable<any>, retryCount: number): Observable<any> {
    return error.pipe(
      concatMap((checkErr: HttpErrorResponse, count: number) => {

        if (count <= retryCount) {
          switch (checkErr.status) {
            case ErrorCode.serverDown:
              return of(checkErr)
            case ErrorCode.unauthorized:
              return of(checkErr)
          }
        }
        return throwError(checkErr);
      })
    )
  }

  setError(error: HttpErrorResponse): string {
    let errorMessage = 'Unknown Error Occured';
    if (error.error instanceof ErrorEvent) {
      //Client side error
      errorMessage = error.error.message;
    } else {
      //server side error
      if (error.status !== ErrorCode.serverDown) {
        errorMessage = error.error.errorMessage;
      }
    }
    return errorMessage;
  }
}
