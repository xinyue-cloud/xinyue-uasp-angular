import { SelectItem } from '@xinyue/core';

export enum ModuleTypes {
  Category = 'C',
  Divide = 'D',
  Module = 'M',
}

export const MODULE_TYPES: SelectItem[] = [
  { id: 'C', text: '分类' },
  { id: 'D', text: '分隔符' },
  { id: 'M', text: '模块' },
]
