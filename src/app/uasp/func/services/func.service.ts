import { Injectable }           from '@angular/core';
import { CodeName, HttpResult } from '@xinyue/core';
import { FuncClient }           from './func.client';

@Injectable()
export class FuncService {

  _candidate!: CodeName[];

  constructor(
    private client: FuncClient,
  ) {
    this.candidateActions();
  }

  candidateActions(): void {
    this.client.candidateActions()?.subscribe(result => {
      if (result.success) {
        this._candidate = result.data;
      }
    })
  }

  get candidate(): CodeName[] {
    return this._candidate;
  }

}
