import { Component, Input, OnInit }           from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { cloneDeep }                          from 'lodash-es';

import { KuTipService, SelectItem, KuEventService } from '@xinyue/core';
import { MainTab }                                  from '@xinyue/uasp';

import { APPLIC_TYPES, ApplicVo } from '../models';
import { ApplicClient }           from '../services';
import {
  EVENT_APPLIC_CLICK_QUERY,
  EVENT_APPLIC_CLOSE_ACTIVE,
  EVENT_APPLIC_NEW_ANEW_OPEN,
  EVENT_APPLIC_NEW_CLOSE,
}                                 from '../events';

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

  ngOnInit(): void {

    if (!this.entry.isNew && this.entry.businessKey) {
      this.loading = true;
      this.client.selectById({
        id: this.entry.businessKey!,
      })?.subscribe(result => {
        this.loading = false;
        if (result.success) {
          this.rawData = result.data;
          this.form1.patchValue(result.data);
        } else {
          this.tip.error(result.message ?? '获取数据失败。');
        }
      });
    }

  }

  onSubmit(closed: boolean) {

    if (this.submitting) {
      return;
    }
    if (!this.form1.valid) {
      this.tip.error('请检查表单内的数据。', '信息填写不完整');
      return;
    }

    this.submitting = true;
    if (this.entry.isNew) {

      this.client.create(this.form1.value)?.subscribe((result) => {
        this.submitting = false;
        if (result.success) {
          this.tip.success('应用创建成功。', '成功');
          if (closed) {
            this.eventService.emit({
              type: EVENT_APPLIC_NEW_CLOSE,
            });
          } else {
            this.eventService.emit({
              type   : EVENT_APPLIC_NEW_ANEW_OPEN,
              payload: {
                title      : result.data.name,
                businessKey: result.data.appId,
              },
            });
          }
          this.eventService.emit({
            type: EVENT_APPLIC_CLICK_QUERY,
          });
        } else {
          this.tip.error(result.message ?? '保存失败。');
        }
      });
    } else if (!!this.entry.businessKey) {

      this.client.update(this.entry.businessKey!, this.form1.value)?.subscribe((result) => {
        this.submitting = false;
        if (result.success) {
          this.rawData = result.data;
          this.tip.success('应用保存成功。', '成功');
          if (closed) {
            this.eventService.emit({
              type   : EVENT_APPLIC_CLOSE_ACTIVE,
              payload: {
                title      : this.form1.value.name,
                businessKey: this.form1.value.appId,
              },
            })
          }
          this.eventService.emit({
            type: EVENT_APPLIC_CLICK_QUERY,
          });
        } else {
          this.tip.error(result.message ?? '保存失败。');
        }
      });
    }
  }

  onRest() {
    this.form1.reset(this.rawData);
  }
}
