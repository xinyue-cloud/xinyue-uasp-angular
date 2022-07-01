import { SelectItem } from '@xinyue/core';

export enum UsableStatus {
  Valid = 'V',
  Invalid = 'I',
}

export const USABLE_STATUS: SelectItem[] = [
  { id: 'V', text: '启用' },
  { id: 'I', text: '禁用' },
]
