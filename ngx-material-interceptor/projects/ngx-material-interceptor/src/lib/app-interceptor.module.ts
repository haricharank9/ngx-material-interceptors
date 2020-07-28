import { CommonModule } from "@angular/common";
import { InjectionToken, ModuleWithProviders, NgModule } from "@angular/core";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

import { IInterceptorInjectors, InterceptorInjectors } from "./interceptor-injectors";
import { LoaderSpinnerComponent } from "./loader-spinner/loader-spinner.component";
import { ILoaderIndicatorService } from "./services/ILoaderIndicatorService";
import { LoaderIndicatorService } from "./services/loader-indicator.service";


@NgModule({
  declarations: [LoaderSpinnerComponent],
  exports: [LoaderSpinnerComponent],
  imports: [CommonModule, MatProgressSpinnerModule],
  providers: [
    {
      provide: ILoaderIndicatorService,
      useClass: LoaderIndicatorService,
    },
  ],
})
export class AppInterceptorModule {
  static forRoot(
    options?: IInterceptorInjectors
  ): ModuleWithProviders<AppInterceptorModule> {
    return {
      ngModule: AppInterceptorModule,
      providers: [
        {
          provide: INTERCEPT_INJECT_PARAMS,
          useValue: options,
        },
        {
          provide: InterceptorInjectors,
          useFactory: provideMyServiceOptions,
          deps: [INTERCEPT_INJECT_PARAMS],
        },
      ],
    };
  }
}
export const INTERCEPT_INJECT_PARAMS = new InjectionToken<
  IInterceptorInjectors
>("forRoot Method");
export function provideMyServiceOptions(
  options?: IInterceptorInjectors
): InterceptorInjectors {
  let myServiceOptions = new InterceptorInjectors();

  if (options) {
    myServiceOptions = { ...options };
  }

  return myServiceOptions;
}
