import { KuMenuItem } from '@xinyue/ui';
import { KuProfile }  from './profile';

export interface KuLoginUser {
  profile: KuProfile,
  mainMenus: KuMenuItem[];
  roles: string[];
  permissions: { [key: string]: string[] };
}
