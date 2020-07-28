import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";

import { InterceptorInjectors } from "../interceptor-injectors";
import { ILoaderIndicatorService } from "../services/ILoaderIndicatorService";

@Injectable()
export class HttpLoaderInterceptor implements HttpInterceptor {
  constructor(
    private loaderIndicatorService: ILoaderIndicatorService,
    private interceptorInjectors: InterceptorInjectors
  ) {}

  private urlExclusions = this.interceptorInjectors.urlExclusions;

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.urlExclusions.some((url) => req.url.includes(url))) {
      return next.handle(req);
    } else {
      // emit onStarted event before request execution
      this.loaderIndicatorService.onStarted(req);

      return (
        next
          .handle(req)
          // emit onFinished event after request execution
          .pipe(
            finalize(() => {
              this.loaderIndicatorService.onFinished(req);
            })
          )
      );
    }
  }
}
