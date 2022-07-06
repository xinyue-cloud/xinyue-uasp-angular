import { DataStatus }  from '@xinyue/uasp'
import { ApplicTypes } from '../types'

export interface ApplicVo {
  appId?: string;
  code?: string;
  name?: string;
  level?: number;
  type?: ApplicTypes;
  typeName?: string;
  url?: string;
  sort?: number;
  needRelease?: boolean;
  creatorId?: string;
  creatorName?: string;
  createTime?: Date;
  status?: DataStatus;
  statusName?: string;
  remark?: string;
}
