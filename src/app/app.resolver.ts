import { Injectable }                                           from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { forkJoin, Observable }           from 'rxjs';
import { map }                            from 'rxjs/operators';
import { KuAccountClient, KuAuthService } from '@xinyue/uasp';

import { InitialData } from './app.types';

@Injectable({
  providedIn: 'root',
})
export class InitialDataResolver implements Resolve<InitialData> {

  constructor(
    private accountClient: KuAccountClient,
    private authService: KuAuthService,
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<InitialData> {
    //console.info('InitialDataResolver()');

    // @ts-ignore
    return forkJoin([
      this.accountClient.getInfo(),
    ]).pipe(
      // @ts-ignore
      map(([loginUser]) => ({
        navigation: {
          // @ts-ignore
          sidebar: loginUser.data.sidebar,
        },
        // @ts-ignore
        user: uiResult.data,
      })),
    );

  }

}
