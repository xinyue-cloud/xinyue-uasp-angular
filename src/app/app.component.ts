import { DOCUMENT }                                 from '@angular/common';
import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router }   from '@angular/router';

import { defineLocale }  from 'ngx-bootstrap/chronos';
import { zhCnLocale }    from 'ngx-bootstrap/locale';
import { setTheme }      from 'ngx-bootstrap/utils';
import { PrimeNGConfig } from 'primeng/api';

import { KuConfigService }               from '@xinyue/core';
import { KU_HOLD_TRANSITION, PrimengZh } from '@xinyue/uasp';

@Component({
  selector   : 'msp-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, AfterViewInit {

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
    private primeNGConfig: PrimeNGConfig,
    private appConfig: KuConfigService,
    //private translateService: TranslateService,
  ) {

    // @ts-ignore
    window.paceOptions = { ajax: false };
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        // @ts-ignore
        Pace.start();
      } else if (event instanceof NavigationEnd) {
        // @ts-ignore
        Pace.stop();
      }
    });

  }

  ngOnInit(): void {
    setTheme('bs4');
    this.primeNGConfig.setTranslation(PrimengZh);
    //this.translateService.setDefaultLang('en');
  }

  translate(lang: string) {
    //this.translateService.use(lang);
    //this.translateService.get('primeng').subscribe(res => this.config.setTranslation(res));
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      defineLocale('zh-cn', zhCnLocale);
      this.document.body.classList.remove(KU_HOLD_TRANSITION);
    });
  }

}
