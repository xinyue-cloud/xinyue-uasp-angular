import { DataStatus } from '@xinyue/uasp';

export interface ApplicTenantVo {
  tenantAppId: string;
  appId: string;
  tenantId: string;
  tenantName: string;
  createTime: Date;
  expireTime?: Date;
  creatorId: string;
  creatorName: string;
  status: DataStatus;
  statusName?: string;
}
