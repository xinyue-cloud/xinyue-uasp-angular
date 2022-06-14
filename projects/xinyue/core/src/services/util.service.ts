import { formatDate }                    from '@angular/common';
import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { NavigationExtras, Router }      from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class KuUtilService {

  constructor(
    private router: Router,
    @Inject(LOCALE_ID) private locale: string,
  ) {
  }

  public randomId(length: number = 10): string {
    // noinspection SpellCheckingInspection
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let name = '';
    for (let i = 0; i < length; i++) {
      name += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return name;
  }

  public guid(): string {
    let d = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
      d += performance.now();
    }
    // noinspection SpellCheckingInspection
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  }

  public newId(): string {
    return this.guid().replace(/-/g, '').toUpperCase();
  }

  public now(): Date {
    return new Date();
  }

  public nowFormat(format: string): string {
    return formatDate(this.now(), format, this.locale);
  }

  public nowDateFormat(): string {
    return formatDate(this.now(), 'yyyy-MM-dd', this.locale);
  }

  public nowDateTimeFormat(): string {
    return formatDate(this.now(), 'yyyy-MM-dd HH:mm:ss', this.locale);
  }

  public navigate(route: Array<string>, extras?: NavigationExtras): void {
    this.router.navigate(route, extras).then((value) => {
    });
  }

  public navigateAfter(route: Array<string>, ms: number = 500): void {
    setTimeout(() => {
      this.router.navigate(route).then((value) => {
      });
    }, ms);
  }

}
