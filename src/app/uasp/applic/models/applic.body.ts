import { ApplicTypes } from './applic-typests'
import { DataStatus }  from '@xinyue/uasp'

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
