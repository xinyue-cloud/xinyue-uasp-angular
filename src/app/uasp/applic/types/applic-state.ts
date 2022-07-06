import { FormGroup }               from '@angular/forms';
import { DATA_STATUS, DataStatus } from '@xinyue/uasp';

import { ApplicTenantVo, ApplicVo } from '../models';
import { TableOption }              from '../../../shared';
import { KuSelectItem }             from '@xinyue/core';
import { cloneDeep }                from 'lodash-es';

export class ManageState {
  tabIndex: number = 0;
  tabs: TabState[] = [];
}

export class ListState {
  query: {
    searchText: string,
    status: DataStatus,
  } = {
    searchText: '',
    status    : DataStatus.Valid,
  };
  statusItems: KuSelectItem[] = cloneDeep(DATA_STATUS);
  option: TableOption<ApplicVo> = new TableOption();
}

export class TabState {

  static newTab(group: FormGroup, raw: ApplicVo): TabState {
    let t = new TabState();
    t.title = '[未命名项]';
    t.isNew = true;
    t.form = FormState.builder(t, group, raw);
    t.tenant = TenantState.builder(t);
    return t;
  }

  static editTab(group: FormGroup, raw: ApplicVo): TabState {
    let t = new TabState();
    t.title = raw.name!;
    t.businessKey = raw.appId;
    t.isNew = false;
    t.form = FormState.builder(t, group, raw);
    t.tenant = TenantState.builder(t);
    return t;
  }

  title!: string;
  isNew!: boolean;
  businessKey?: string;
  modified: boolean = false;
  active: number = 0;
  form!: FormState;
  tenant!: TenantState;
}

export class FormState {

  static builder(tab: TabState, group: FormGroup, raw: ApplicVo): FormState {
    let s = new FormState();
    s.tab = tab;
    s.formGroup = group;
    s.rawValue = raw;
    return s;
  }

  set modified(value: boolean) {
    this.tab.modified = value;
  }

  get modified(): boolean {
    return this.tab.modified!;
  }

  tab!: TabState;
  formGroup!: FormGroup;
  rawValue!: ApplicVo;
}

export class TenantState {
  static builder(tab: TabState): TenantState {
    let t = new TenantState();
    t.tab = tab;
    return t;
  }

  tab!: TabState;
  query: {
    searchText: string,
    status: DataStatus,
  } = {
    searchText: '',
    status    : DataStatus.Valid,
  };
  option: TableOption<ApplicTenantVo> = new TableOption();
}
