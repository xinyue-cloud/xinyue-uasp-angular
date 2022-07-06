import { EventEmitter, Injectable }           from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { KuAlertService, KuSelectItem, KuTipService } from '@xinyue/core';
import { DATA_STATUS, DataStatus }                    from '@xinyue/uasp';
import { cloneDeep }                                  from 'lodash-es';

import { ApplicVo }     from '../models';
import { ApplicClient } from './applic.client';
import {
  APPLIC_TYPES,
  TabState,
  ApplicTypes,
  ManageState,
  ListState,
}                       from '../types';

export interface FormSubmitArg {
  tab: TabState,
  close: boolean
}

@Injectable()
export class ApplicManager {

  manage: ManageState = new ManageState();
  list: ListState = new ListState();

  applicTypes: KuSelectItem[];
  formSubmit: EventEmitter<FormSubmitArg> = new EventEmitter();

  constructor(
    private alert: KuAlertService,
    private client: ApplicClient,
    private fb: FormBuilder,
    private tip: KuTipService,
  ) {
    this.applicTypes = cloneDeep(APPLIC_TYPES);
    this.initList();
    this.list.option.onReload = () => {
      this.onReload();
    };
  }

  // -------------------------------- Manager View --------------------------------

  showHomeTab() {
    this.manage.tabIndex = 0;
  }

  appendTab(tab: TabState): void {
    this.manage.tabs.push(tab);
    this.manage.tabIndex = this.manage.tabs.indexOf(tab) + 1;
  }

  tryShowTab(businessKey: string): boolean {
    let rows = this.manage.tabs.filter(x => x.businessKey === businessKey);
    if (rows.length > 0) {
      this.manage.tabIndex = this.manage.tabs.indexOf(rows[0]) + 1;
      return true;
    }
    return false;
  }

  directCloseTab(tab: TabState): void {
    this.manage.tabs.splice(this.manage.tabs.indexOf(tab), 1);
    this.showHomeTab();
  }

  // -------------------------------- List View --------------------------------

  initList(): void {
    this.list.statusItems = cloneDeep(DATA_STATUS);
  }

  onReload(): void {
    this.client.queryPage({
      ...this.list.option.params,
    }, {
      ...this.list.query,
    })?.subscribe(httpResult => {
      this.list.option.dataSource = httpResult.data.rows;
      this.list.option.totalRecords = httpResult.data.totals;
    });
  }

  create() {
    let list = this.manage.tabs.filter(x => x.isNew);
    if (list.length > 0) {
      this.manage.tabIndex = this.manage.tabs.indexOf(list[0]) + 1;
    } else {
      let vo: ApplicVo = {
        level      : 1,
        type       : ApplicTypes.PC,
        sort       : 0,
        needRelease: true,
        status     : DataStatus.Valid,
      };
      let _tab = TabState.newTab(this.makeFormGroup(vo), vo);
      this.appendTab(_tab);
    }
  }

  view(row: ApplicVo) {
    if (!this.tryShowTab(row.appId!)) {
      this.client.getById({
        id: row.appId!,
      })?.subscribe(result => {
        if (result.success) {
          let _tab = TabState.editTab(
            this.makeFormGroup(result.data),
            result.data,
          );
          this.appendTab(_tab);
        } else {
          this.tip.error(result.message ?? '获取数据失败。');
        }
      });
    }
  }

  makeFormGroup(row: any):
    FormGroup {
    return this.fb.group({
      appId      : [row.appId],
      code       : [row.code, [Validators.required]],
      name       : [row.name, [Validators.required]],
      level      : [row.level, [Validators.required]],
      type       : [row.type, [Validators.required]],
      url        : [row.url],
      sort       : [row.sort, [Validators.required]],
      status     : [row.status, [Validators.required]],
      needRelease: [row.needRelease],
      remark     : [row.remark],
    });
  }

}
