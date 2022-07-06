import { FormGroup }               from '@angular/forms';
import { DATA_STATUS, DataStatus } from '@xinyue/uasp';

import { ApplicTenantVo, ApplicVo } from '../models';
import { TableOption }              from '../../../shared';
import { KuSelectItem }             from '@xinyue/core';
import { cloneDeep }                from 'lodash-es';

export class ApplicManageState {
  tabIndex: number = 0;
  tabs: ApplicTabState[] = [];
}

export class ApplicListState {
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

export class ApplicTabState {

  static newTab(group: FormGroup, raw: ApplicVo): ApplicTabState {
    let t = new ApplicTabState();
    t.title = '[未命名项]';
    t.isNew = true;
    t.form = ApplicFormState.builder(t, group, raw);
    t.tenant = ApplicTenantState.builder(t);
    return t;
  }

  static editTab(group: FormGroup, raw: ApplicVo): ApplicTabState {
    let t = new ApplicTabState();
    t.title = raw.name!;
    t.businessKey = raw.appId;
    t.isNew = false;
    t.form = ApplicFormState.builder(t, group, raw);
    t.tenant = ApplicTenantState.builder(t);
    return t;
  }

  title!: string;
  isNew!: boolean;
  businessKey?: string;
  modified: boolean = false;
  active: number = 0;
  form!: ApplicFormState;
  tenant!: ApplicTenantState;
}

export class ApplicFormState {

  static builder(tab: ApplicTabState, group: FormGroup, raw: ApplicVo): ApplicFormState {
    let s = new ApplicFormState();
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

  tab!: ApplicTabState;
  formGroup!: FormGroup;
  rawValue!: ApplicVo;
}

export class ApplicTenantState {
  static builder(tab: ApplicTabState): ApplicTenantState {
    let t = new ApplicTenantState();
    t.tab = tab;
    return t;
  }

  tab!: ApplicTabState;
  query: {
    searchText: string,
    status: DataStatus,
  } = {
    searchText: '',
    status    : DataStatus.Valid,
  };
  option: TableOption<ApplicTenantVo> = new TableOption();
}
