import { UsableStatus } from '@xinyue/uasp'
import { ModuleTypes }  from './module-types'
import { UsageTypes }   from './usage-types'

export interface DefineBody {
  moduleId?: string;
  appId?: string;
  parentId?: string;
  parentName?: string;
  type: ModuleTypes;
  code?: string;
  name: string;
  icon?: string;
  url?: string;
  target?: string;
  sort?: string;
  usage?: UsageTypes;
  status: UsableStatus;
  remark?: string;
}
