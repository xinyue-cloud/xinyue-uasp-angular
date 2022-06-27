import { DataStatus } from '@xinyue/uasp';

export interface ApplicTenantBody {
  tenantAppId?: string;
  appId: string;
  tenantId: string;
  expireTime?: Date;
  status: DataStatus;
}
