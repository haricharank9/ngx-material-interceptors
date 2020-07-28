import { HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";

import { ILoaderIndicatorService } from "./ILoaderIndicatorService";


@Injectable()
export class LoaderIndicatorService implements ILoaderIndicatorService {
  constructor() {}
  private _isLoaded: Subject<boolean> = new BehaviorSubject<boolean>(false);
  public get isLoaded(): Observable<boolean> {
    return this._isLoaded.asObservable();
  }
  public set setIsLoaded(value: boolean) {
    this._isLoaded.next(value);
  }

  /**
   * Stores all currently active requests
   */
  private requests: HttpRequest<any>[] = [];

  /**
   * Adds request to the storage and notifies observers
   */
  onStarted(req: HttpRequest<any>): void {
    this.requests.push(req);
    this.notify();
  }

  /**
   * Removes request from the storage and notifies observers
   */
  onFinished(req: HttpRequest<any>): void {
    const index = this.requests.indexOf(req);
    if (index !== -1) {
      this.requests.splice(index, 1);
    }
    this.notify();
  }

  /**
   * Notifies observers about whether there are any requests on fly
   */
  private notify(): void {
    this.setIsLoaded = this.requests.length !== 0;
  }
}
