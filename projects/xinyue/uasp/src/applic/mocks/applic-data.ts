import { ApplicTypes, ApplicVo } from '../models';
import { DataStatus }            from '../../shared';

export const APPLIC_DATA: ApplicVo[] = [{
  appId      : 'APP_0001',
  code       : 'uasp',
  name       : '统一支撑平台',
  level      : 1,
  type       : ApplicTypes.PC,
  typeName   : '',
  url        : '',
  sort       : 0,
  needRelease: true,
  creatorId  : '0001',
  creatorName: 'XiaLiang',
  createTime : new Date(),
  status     : DataStatus.Valid,
  statusName : '有效',
}];
