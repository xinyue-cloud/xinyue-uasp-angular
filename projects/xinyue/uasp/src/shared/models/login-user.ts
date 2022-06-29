import { KuMenuItem } from '@xinyue/ui';

export interface KuLoginUser {
  userId: string;
  avatar: string;
  displayName: string;
  mobile: string;
  userType: string;
  tenantId?: string;
  companyId?: string;
  departId?: string;
  departName?: string;
  mainMenus: KuMenuItem[];
  permissions: any;
}
