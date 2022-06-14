import { InjectionToken } from '@angular/core';
import { KuLevel }        from './level.model';

export const KU_LOGGER_LEVEL = new InjectionToken<KuLevel>('LOGGER_LEVEL');
