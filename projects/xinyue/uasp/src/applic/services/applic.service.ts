import { Injectable } from '@angular/core';
import { cloneDeep }  from 'lodash-es';

import { KuSelectItem } from '@xinyue/core';
import { publish }      from 'rxjs';

@Injectable()
export class ApplicService {

  private _statusItems: KuSelectItem[] = [
    { id: 'NEW', text: '新增' },
    { id: 'AUDIT', text: '审核中' },
    { id: 'REJECT', text: '未通过' },
    { id: 'VALID', text: '已生效' },
    { id: 'INVALID', text: '已作废' },
  ];

  constructor() {
  }

  get statusItems(): KuSelectItem[] {
    return cloneDeep(this._statusItems);
  }

}
