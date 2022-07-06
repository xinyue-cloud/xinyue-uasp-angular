import { EventEmitter, Injectable }           from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { KuAlertService, KuSelectItem, KuTipService } from '@xinyue/core';
import { DATA_STATUS, DataStatus }                    from '@xinyue/uasp';
import { cloneDeep }                                  from 'lodash-es';

import { ApplicVo }         from '../models';
import { ApplicClient }     from './applic.client';
import {
  APPLIC_TYPES,
  ApplicTabState,
  ApplicTypes,
  ApplicManageState,
  ApplicListState,
}                           from '../types';
import { SweetAlertResult } from 'sweetalert2';

@Injectable()
export class ApplicManager {

  manage: ApplicManageState = new ApplicManageState();
  list: ApplicListState = new ApplicListState();

  applicTypes: KuSelectItem[];
  onSubmit: EventEmitter<{
    tab: ApplicTabState,
    close: boolean
  }> = new EventEmitter();

  constructor(
    private alert: KuAlertService,
    private client: ApplicClient,
    private fb: FormBuilder,
    private tip: KuTipService,
  ) {
    this.applicTypes = cloneDeep(APPLIC_TYPES);
  }

  // -------------------------------- Manager View --------------------------------

  showHomeTab(): void {
    this.manage.tabIndex = 0;
  }

  appendTab(tab: ApplicTabState): void {
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

  tryCloseTab(tab: ApplicTabState) {
    if (tab.modified) {
      this.alert.custom({
          confirmButtonText: '保存',
          denyButtonText   : '不保存',
          cancelButtonText : '取消',
        }, '该记录数据已经修改，是否需要保存？', '选择关闭方式',
      ).then((result: SweetAlertResult) => {
        if (result.isConfirmed) {
          this.onSubmit.emit({
            tab  : tab,
            close: true,
          });
        } else if (result.isDenied) {
          this.directCloseTab(tab);
        }
      });
    } else {
      this.directCloseTab(tab);
    }
  }

  directCloseTab(tab: ApplicTabState): void {
    this.manage.tabs.splice(this.manage.tabs.indexOf(tab), 1);
    this.showHomeTab();
  }

  // -------------------------------- List View --------------------------------

  onReload(): void {
    this.list.option.onReload();
  }

  create(): void {
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
      let _tab = ApplicTabState.newTab(this.makeFormGroup(vo), vo);
      this.appendTab(_tab);
    }
  }

  view(row: ApplicVo): void {
    if (!this.tryShowTab(row.appId!)) {
      this.client.getById({
        id: row.appId!,
      })?.subscribe(result => {
        if (result.success) {
          let _tab = ApplicTabState.editTab(
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

  makeFormGroup(row: any): FormGroup {
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
