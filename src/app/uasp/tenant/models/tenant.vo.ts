import { KeyValue }   from '@xinyue/core';
import { DataStatus } from '@xinyue/uasp';

export interface TenantVo {
  tenantId: string;
  code: string;
  name: string;
  expireTime?: Date;
  twoApps?: KeyValue[];
  creatorId: string;
  creatorName: string;
  createTime: Date;
  updaterId?: string;
  updateTime?: Date;
  status: DataStatus;
  remark?: string;
}
