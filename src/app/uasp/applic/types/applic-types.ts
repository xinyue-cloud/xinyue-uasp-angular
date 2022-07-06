import { KuSelectItem } from '@xinyue/core';

export enum ApplicTypes {
  PC = 'PC',
  WX = 'WX',
  APP = 'APP',
}

export const APPLIC_TYPES: KuSelectItem[] = [
  { id: 'PC', text: 'Web应用' },
  { id: 'WX', text: '微信应用' },
  { id: 'APP', text: '移动应用' },
]
