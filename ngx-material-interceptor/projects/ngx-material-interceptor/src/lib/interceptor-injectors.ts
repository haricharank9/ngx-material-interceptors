import { ErrorHandler, Type } from "@angular/core";

export class InterceptorInjectors implements IInterceptorInjectors {
  public urlExclusions?: string[];
  public errorExclusions?: string[];
  public errorInjector: Type<ErrorHandler>;
}
export interface IInterceptorInjectors {
  urlExclusions?: string[];
  errorExclusions?: string[];
  errorInjector: Type<ErrorHandler>;
}
