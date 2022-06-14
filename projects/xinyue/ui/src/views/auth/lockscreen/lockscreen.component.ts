import { DOCUMENT }                                            from '@angular/common';
import { AfterViewInit, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { KuLoggerService }                                     from "@xinyue/core";

const CLASS_LOCKSCREEN = 'lockscreen';

@Component({
  selector   : 'ku-lockscreen',
  templateUrl: './lockscreen.component.html',
})
export class KuLockscreenComponent implements OnInit, OnDestroy, AfterViewInit {

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private logger: KuLoggerService,
  ) {
    this.logger.debug('LockscreenComponent -> constructor()');
  }

  ngOnInit(): void {
    this.logger.debug('LockscreenComponent -> ngOnInit()');
    if (!this.document.body.classList.contains(CLASS_LOCKSCREEN)) {
      this.document.body.classList.add(CLASS_LOCKSCREEN);
    }
  }

  ngAfterViewInit(): void {
    this.logger.debug('LockscreenComponent -> ngAfterViewInit()');
  }

  ngOnDestroy(): void {
    this.logger.debug('LockscreenComponent -> ngOnDestroy()');
    if (this.document.body.classList.contains(CLASS_LOCKSCREEN)) {
      this.document.body.classList.remove(CLASS_LOCKSCREEN);
    }
  }
}
