import { Component, Input, OnInit }           from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { cloneDeep }                          from 'lodash-es';

import { KuTipService, SelectItem, KuEventService } from '@xinyue/core';
import { MainTab }                                  from '@xinyue/uasp';

import { APPLIC_TYPES, ApplicVo } from '../models';
import { ApplicClient }           from '../services';
import {
  APPLIC_LIST_QUERY,
  APPLIC_MAIN_TAB_CLOSE_ACTIVE, APPLIC_MAIN_TAB_MODIFY,
  APPLIC_MAIN_TAB_NEW_MODIFY,
  APPLIC_MAIN_TAB_NEW_CLOSE,
}                                 from '../event.types';

@Component({
  selector   : 'uasp-applic-edit',
  templateUrl: './applic-edit.component.html',
})
export class ApplicEditComponent implements OnInit {

  @Input() entry!: MainTab;

  form1!: FormGroup;
  rawData!: ApplicVo;
  loading = false;
  submitting = false;

  applicTypes: SelectItem[];

  constructor(
    private formBuilder: FormBuilder,
    private client: ApplicClient,
    private tip: KuTipService,
    private eventService: KuEventService,
  ) {
    this.applicTypes = cloneDeep(APPLIC_TYPES);
    this.form1 = this.formBuilder.group({
      appId      : [''],
      code       : ['', [Validators.required]],
      name       : ['', [Validators.required]],
      level      : ['', [Validators.required]],
      type       : ['', [Validators.required]],
      url        : [''],
      sort       : ['0', [Validators.required]],
      status     : ['', [Validators.required]],
      needRelease: [false],
      remark     : [''],
    });
  }

  resetModify(): void {
    this.entry.modified = false;
    this.form1.valueChanges.subscribe(next => {
      this.entry.modified = true;
    })
  }

  ngOnInit(): void {

    if (!this.entry.isNew && this.entry.businessKey) {
      this.loading = true;
      this.client.getById({
        id: this.entry.businessKey!,
      })?.subscribe(result => {
        this.loading = false;
        if (result.success) {
          this.rawData = result.data;
          this.form1.patchValue(result.data);
          this.resetModify();
        } else {
          this.tip.error(result.message ?? '获取数据失败。');
        }
      });
    } else {
      this.resetModify();
    }
  }

  onRest() {
    this.form1.reset(this.rawData);
    this.resetModify();
  }

  onSubmit(closed: boolean) {

    if (this.submitting) {
      return;
    }
    if (!this.form1.valid) {
      this.tip.error('请检查表单内的数据。', '信息填写不完整');
      return;
    }
    if (this.entry.isNew) {
      this.postCreate(closed);
    } else if (!!this.entry.businessKey) {
      this.postUpdate(closed);
    }
  }

  private postUpdate(closed: boolean) {

    if (!this.entry.modified) {
      this.tip.info('表单没有被修改。');
      if (closed) {
        this.eventService.emit({
          type: APPLIC_MAIN_TAB_CLOSE_ACTIVE,
        })
      }
      return;
    }

    this.submitting = true;
    this.client.update(this.entry.businessKey!, this.form1.value)?.subscribe((result) => {
      this.submitting = false;
      if (result.success) {
        this.rawData = result.data;
        this.resetModify();
        this.tip.success('应用保存成功。', '成功');
        if (closed) {
          this.eventService.emit({
            type: APPLIC_MAIN_TAB_CLOSE_ACTIVE,
          })
        } else {
          this.eventService.emit({
            type   : APPLIC_MAIN_TAB_MODIFY,
            payload: {
              title      : this.form1.value.name,
              businessKey: this.form1.value.appId,
            },
          })
        }
        this.eventService.emit({
          type: APPLIC_LIST_QUERY,
        });
      } else {
        this.tip.error(result.message ?? '保存失败。');
      }
    });
  }

  private postCreate(closed: boolean) {

    this.submitting = true;
    this.client.create(this.form1.value)?.subscribe((result) => {
      this.submitting = false;
      if (result.success) {
        this.tip.success('应用创建成功。', '成功');
        if (closed) {
          this.eventService.emit({
            type: APPLIC_MAIN_TAB_NEW_CLOSE,
          });
        } else {
          this.form1.patchValue({
            appId: result.data.appId,
          });
          this.resetModify();
          this.eventService.emit({
            type   : APPLIC_MAIN_TAB_NEW_MODIFY,
            payload: {
              title      : result.data.name,
              businessKey: result.data.appId,
            },
          });
        }
        this.eventService.emit({
          type: APPLIC_LIST_QUERY,
        });
      } else {
        this.tip.error(result.message ?? '保存失败。');
      }
    });
  }

}
