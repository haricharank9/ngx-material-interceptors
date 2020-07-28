import { HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export abstract class ILoaderIndicatorService {
  abstract onStarted(req: HttpRequest<any>): void;
  abstract onFinished(req: HttpRequest<any>): void;
  abstract get isLoaded(): Observable<boolean>;
  abstract set setIsLoaded(value: boolean);
}
