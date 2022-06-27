import { DataStatus } from '@xinyue/uasp';
import { TenantVo }   from '../models';

export const TENANT_DATA: TenantVo[] = [{
  tenantId   : 'TEN_00001',
  code       : 'XY',
  name       : '心悦',
  creatorId  : 'USR_00001',
  creatorName: '管理员',
  createTime : new Date(),
  status     : DataStatus.Valid,
}]
