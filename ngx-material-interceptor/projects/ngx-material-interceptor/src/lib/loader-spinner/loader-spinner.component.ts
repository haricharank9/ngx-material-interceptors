import { AfterViewChecked, ChangeDetectorRef, Component, Input, OnInit } from "@angular/core";

import { ILoaderIndicatorService } from "../services/ILoaderIndicatorService";


@Component({
  selector: "loader-spinner",
  templateUrl: "./loader-spinner.component.html",
  styleUrls: ["./loader-spinner.component.scss"],
})
export class LoaderSpinnerComponent implements OnInit, AfterViewChecked {
  @Input() diameter: number = 70;
  @Input() strokeWidth: number = 6;

  constructor(
    public loaderService: ILoaderIndicatorService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {}

  ngAfterViewChecked() {
    this.loaderService.isLoaded.subscribe((isLoaded) => {
      this.cdr.detectChanges();
    });
  }
}
