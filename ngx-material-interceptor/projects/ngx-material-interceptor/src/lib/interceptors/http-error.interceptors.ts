import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { ErrorHandler, Injectable, Injector } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

import { InterceptorInjectors } from "../interceptor-injectors";




@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(
    private injector: Injector,
    private interceptorInjectors: InterceptorInjectors
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap({
        error: (err: any) => {
          if (
            !this.interceptorInjectors.errorExclusions.some((fragment) =>
              req.url.includes(fragment)
            )
          ) {
            this.injector
              .get<ErrorHandler>(this.interceptorInjectors.errorInjector)
              .handleError(err);
          }
          return err;
        },
      })
    );
  }
}
