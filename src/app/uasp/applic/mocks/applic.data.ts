import { ApplicVo }    from '../models';
import { DataStatus }  from '@xinyue/uasp';
import { ApplicTypes } from '../types';

export const APPLIC_DATA: ApplicVo[] = [{
  appId      : 'APP_0001',
  code       : 'uasp',
  name       : '统一支撑平台',
  level      : 1,
  type       : ApplicTypes.PC,
  typeName   : 'Web应用',
  url        : 'http://localhost:8080',
  sort       : 0,
  needRelease: true,
  creatorId  : '0001',
  creatorName: 'XiaLiang',
  createTime : new Date(),
  status     : DataStatus.Valid,
  statusName : '有效',
  remark     : '',
}];
