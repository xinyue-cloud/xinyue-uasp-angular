import { Component, Input, OnInit }           from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { cloneDeep }                          from 'lodash-es';

import { KuTipService, SelectItem } from '@xinyue/core';

import { APPLIC_TYPES, ApplicVo } from '../models';
import { ApplicClient }           from '../services';

@Component({
  selector   : 'uasp-applic-edit',
  templateUrl: './applic-edit.component.html',
})
export class ApplicEditComponent implements OnInit {

  @Input() businessKey!: string;

  form1!: FormGroup;
  rawData!: ApplicVo;
  loading = false;
  submitting = false;

  applicTypes: SelectItem[];

  constructor(
    private formBuilder: FormBuilder,
    private client: ApplicClient,
    private tip: KuTipService,
  ) {
    this.applicTypes = cloneDeep(APPLIC_TYPES);
    this.form1 = this.formBuilder.group({
      appId      : [''],
      code       : ['', [Validators.required]],
      name       : ['', [Validators.required]],
      level      : ['', [Validators.required]],
      type       : [1, [Validators.required]],
      url        : [''],
      sort       : [0, [Validators.required]],
      status     : [''],
      needRelease: [false],
      remark     : [''],
    });
  }

  ngOnInit(): void {

    this.loading = true;
    this.client.selectById({
      id: this.businessKey,
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

  onSubmit(closed: boolean) {

    if (!this.submitting) {
      if (this.form1.valid) {
        this.submitting = true;
        this.client.update(this.businessKey, this.form1.value)?.subscribe((result) => {
          this.submitting = false;
          if (result.success) {
            this.rawData = result.data;
            this.tip.success('应用保存成功。', '成功');
          } else {
            this.tip.error(result.message ?? '保存失败。');
          }
        });
      } else {
        this.tip.error('请检查表单内的数据。', '信息填写不完整');
      }
    }
  }

  onRest() {
    this.form1.reset(this.rawData);
  }
}
