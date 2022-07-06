import { Component, Input, OnInit } from '@angular/core';
import { KuTipService }             from '@xinyue/core';
import { cloneDeep }                from 'lodash-es';

import { ApplicClient, ApplicManager }     from '../services';
import { ApplicFormState, ApplicTabState } from '../types';

@Component({
  selector   : 'uasp-applic-form',
  templateUrl: './applic-form.component.html',
})
export class ApplicFormComponent implements OnInit {

  @Input() state!: ApplicFormState;

  submitting = false;

  constructor(
    public manager: ApplicManager,
    private client: ApplicClient,
    private tip: KuTipService,
  ) {
    manager.onSubmit.subscribe((args: {
      tab: ApplicTabState,
      close: boolean
    }) => {
      if (args.tab === this.state.tab) {
        this.submit(args.close);
      }
    })
  }

  resetModify(): void {
    this.state.modified = false;
    this.ngOnInit();
  }

  ngOnInit(): void {
    this.state.formGroup.valueChanges.subscribe(next => {
      this.state.modified = true;
    });
  }

  restFormGroup() {
    this.state.formGroup.reset(this.state.rawValue);
    this.resetModify();
  }

  submit(closed: boolean) {

    if (this.submitting) {
      return;
    }
    if (!this.state.formGroup.valid) {
      this.tip.error('请检查表单内的数据。', '信息填写不完整');
      return;
    }
    if (this.state.tab.isNew) {
      this.postCreate(closed);
    } else {
      this.postUpdate(closed);
    }
  }

  closeTab(): void {
    this.manager.directCloseTab(this.state.tab);
  }

  private postUpdate(closed: boolean) {

    if (!this.state.modified) {
      if (closed) {
        this.closeTab();
      } else {
        this.tip.info('表单没有修改。');
      }
      return;
    }

    this.submitting = true;
    this.client.update(this.state.formGroup.value)?.subscribe((result) => {
      this.submitting = false;
      if (result.success) {
        this.state.rawValue = cloneDeep(this.state.formGroup.value);
        this.tip.success('应用保存成功。', '成功');
        if (closed) {
          this.closeTab();
        } else {
          this.state.modified = true;
        }
        this.resetModify();
        this.manager.onReload();
      } else {
        this.tip.error(result.message ?? '保存失败。');
      }
    });
  }

  private postCreate(closed: boolean) {

    this.submitting = true;
    this.client.create(this.state.formGroup.value)?.subscribe((result) => {
      this.submitting = false;
      if (result.success) {
        this.tip.success('应用创建成功。', '成功');
        if (closed) {
          this.closeTab();
        } else {
          this.state.formGroup.patchValue({
            appId: result.data.appId,
          });
          this.state.rawValue = result.data;
          this.resetModify();
          this.state.tab.isNew = false;
          this.state.tab.title = result.data.name;
          this.state.tab.businessKey = result.data.appId;
        }
        this.manager.onReload();
      } else {
        this.tip.error(result.message ?? '保存失败。');
      }
    });
  }
}
