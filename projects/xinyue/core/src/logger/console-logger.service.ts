import { Inject, Injectable } from '@angular/core';

import { KuLevel }         from './level.model';
import { KU_LOGGER_LEVEL } from './level.token';
import { KuLoggerService } from './logger.service';

@Injectable()
export class KuConsoleLoggerService extends KuLoggerService {

  constructor(@Inject(KU_LOGGER_LEVEL) level: KuLevel) {
    super();
    Object.keys(KuLevel)
      .filter(s => {
        // @ts-ignore
        return isNaN(s) && level >= KuLevel[s];
      }).forEach(levelName => {
      const methodName: string = levelName.toLowerCase();
      // @ts-ignore
      this[methodName] = console[methodName].bind(console);
    });
  }

}
