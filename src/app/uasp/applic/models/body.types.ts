import { ApplicTypes } from './enum.types';
import { DataStatus }  from '@xinyue/uasp';

export interface ApplicBody {
  appId: string;
  code: string;
  name: string;
  level: number;
  type: ApplicTypes;
  url: string;
  sort: number;
  needRelease: boolean;
  status: DataStatus;
  remark: string;
}

export interface ApplicTenantBody {
  tenantAppId: string;
  appId: string;
  tenantId: string;
  status: DataStatus;
}
