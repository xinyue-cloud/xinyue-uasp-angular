import { Inject, Injectable, InjectionToken } from '@angular/core';

export const KU_TOKEN_STORAGE = new InjectionToken<Storage>('HTTP_STORAGE');

@Injectable({
  providedIn: 'root',
})
export class KuTokenStorage {

  constructor(
    @Inject(KU_TOKEN_STORAGE) private storage: Storage,
  ) {
  }

  public getItem = (key: string): any => this.storage.getItem(key);

  public removeItem = (key: string) => this.storage.removeItem(key);

  public setItem = (key: string, value: string) => this.storage.setItem(key, value);

  public clear = () => this.storage.clear();

}
