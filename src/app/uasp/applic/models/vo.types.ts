import { ApplicTypes } from './enum.types';
import { DataStatus }  from '@xinyue/uasp';

export interface ApplicVo {
  appId: string;
  code: string;
  name: string;
  level: number;
  type: ApplicTypes;
  typeName?: string;
  url: string;
  sort: number;
  needRelease: boolean;
  creatorId: string;
  creatorName: string;
  createTime: Date;
  status: DataStatus;
  statusName?: string;
  remark?: string;
}

export interface ApplicTenantVo {
  tenantAppId: string;
  appId: string;
  tenantId: string;
  tenantName: string;
  createTime: Date;
  status: DataStatus;
  statusName?: string;
}
