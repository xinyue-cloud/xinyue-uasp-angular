import { DOCUMENT }                                            from '@angular/common';
import { AfterViewInit, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { KuLoggerService }                                     from '@xinyue/core';

const CLASS_LOGIN_PAGE = ['login-page', 'pace-primary'];

@Component({
  selector   : 'k-forgot-password',
  templateUrl: './forgot-password.component.html',
})
export class KuForgotPasswordComponent implements OnInit, OnDestroy, AfterViewInit {

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private logger: KuLoggerService,
  ) {
    this.logger.debug('ForgotPasswordComponent -> constructor()');
  }

  ngOnInit(): void {
    this.logger.debug('ForgotPasswordComponent -> ngOnInit()');
    CLASS_LOGIN_PAGE.forEach((cls) => {
      if (!this.document.body.classList.contains(cls)) {
        this.document.body.classList.add(cls);
      }
    });
  }

  ngAfterViewInit(): void {
    this.logger.debug('ForgotPasswordComponent -> ngAfterViewInit()');
  }

  ngOnDestroy(): void {
    this.logger.debug('ForgotPasswordComponent -> ngOnDestroy()');
    CLASS_LOGIN_PAGE.forEach((cls) => {
      if (this.document.body.classList.contains(cls)) {
        this.document.body.classList.remove(cls);
      }
    });
  }
}
