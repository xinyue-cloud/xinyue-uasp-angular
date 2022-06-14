import { DOCUMENT }                                            from '@angular/common';
import { AfterViewInit, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { KuLoggerService }                                     from "@xinyue/core";

const CLASS_REGISTER_PAGE = ['register-page', 'pace-primary'];

@Component({
  selector   : 'ku-register',
  templateUrl: './register.component.html',
})
export class KuRegisterComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private logger: KuLoggerService,
  ) {
    this.logger.debug('RegisterComponent -> ngOnInit()');
  }

  ngOnInit(): void {
    this.logger.debug('RegisterComponent -> ngOnInit()');
    CLASS_REGISTER_PAGE.forEach((cls) => {
      if (!this.document.body.classList.contains(cls)) {
        this.document.body.classList.add(cls);
      }
    });
  }

  ngAfterViewInit(): void {
    this.logger.debug('RegisterComponent -> ngAfterViewInit()');
  }

  ngOnDestroy(): void {
    this.logger.debug('RegisterComponent -> ngOnDestroy()');
    CLASS_REGISTER_PAGE.forEach((cls) => {
      if (this.document.body.classList.contains(cls)) {
        this.document.body.classList.remove(cls);
      }
    });
  }
}
