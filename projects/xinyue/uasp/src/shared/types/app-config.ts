import { KuConfig }             from '@xinyue/core';
import { KuBrand, KuCopyright } from '../layout';

export interface KuAppConfig extends KuConfig {
  brand: KuBrand;
  copyright: KuCopyright;
}
