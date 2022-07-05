import { UsableStatus } from '@xinyue/uasp';
import { ModuleTypes }  from './module-types';
import { UsageTypes }   from './usage-types';

export interface DefineVo {
  moduleId?: string;
  appId?: string;
  parentId?: string;
  parentName?: string;
  type: ModuleTypes;
  typeName?: string;
  code?: string;
  name?: string;
  icon?: string;
  url?: string;
  target?: string;
  sort?: string;
  usage?: UsageTypes | any;
  usageName?: string;
  status?: UsableStatus | any;
  statusName?: string;
  remark?: string;
  actions?: { code: string, name: string }[]
}
