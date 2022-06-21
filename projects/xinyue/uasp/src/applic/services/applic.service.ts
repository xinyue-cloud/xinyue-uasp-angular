import { Injectable } from '@angular/core';
import { SelectItem } from '@xinyue/core';
import { cloneDeep }  from 'lodash-es';

import { DATA_STATUS } from '../../shared';

@Injectable()
export class ApplicService {

  constructor() {
  }

  get statusItems(): SelectItem[] {
    return cloneDeep(DATA_STATUS);
  }

}
