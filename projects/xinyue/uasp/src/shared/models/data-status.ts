import { KuSelectItem } from '@xinyue/core';

export enum DataStatus {
  Draft = 'D',
  Valid = 'V',
  Invalid = 'I',
}

export const DATA_STATUS: KuSelectItem[] = [
  { id: 'D', text: '草稿' },
  { id: 'V', text: '启用' },
  { id: 'I', text: '禁用' },
]
