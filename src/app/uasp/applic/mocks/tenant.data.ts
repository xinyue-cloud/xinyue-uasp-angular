import { ApplicTenantVo } from '../models'
import { DataStatus }     from '@xinyue/uasp'

export const APPLIC_TENANT_DATA: ApplicTenantVo[] = [
  {
    tenantAppId: 'APP_TEN_00001',
    appId      : 'APP_0001',
    tenantId   : 'TEN_0001',
    tenantName : '租户名称1',
    createTime : new Date(),
    expireTime : new Date(),
    creatorId  : 'USER_0001',
    creatorName: '管理员',
    status     : DataStatus.Valid,
    statusName : '可用',
  },
]
