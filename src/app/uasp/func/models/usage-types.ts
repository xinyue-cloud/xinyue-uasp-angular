import { KuSelectItem } from '@xinyue/core';

export enum UsageTypes {
  Admin = 'A',
  Business = 'B',
  Common = 'C',
}

export const USAGE_TYPES: KuSelectItem[] = [
  { id: 'A', text: '管理' },
  { id: 'B', text: '业务' },
  { id: 'C', text: '通用' },
]
