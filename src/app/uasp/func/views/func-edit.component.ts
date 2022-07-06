import { Component, Input, OnInit }                             from '@angular/core';
import { USABLE_STATUS }                                        from '@xinyue/uasp';
import { FormArray, FormBuilder, FormGroup, Validators }        from '@angular/forms';
import { CodeName, KuEventService, KuSelectItem, KuTipService } from '@xinyue/core';
import { cloneDeep }                                            from 'lodash-es';

import { USAGE_TYPES }             from '../models/usage-types';
import {
  FUNC_FORM_DENY_CLOSE,
  FUNC_FORM_SAVE_CLOSE,
  FUNC_MAIN_TAB_CLOSE_ACTIVE,
  FUNC_MAIN_TAB_MODIFY,
  FUNC_MAIN_TAB_NEW_CLOSE,
  FUNC_MAIN_TAB_NEW_MODIFY,
  FUNC_SAVE_COMPLETED,
}                                  from '../event.types';
import { FuncClient, FuncService } from '../services';
import { DefineVo }                from '../models/define-vo';
import { ModuleTypes }             from '../models/module-types';
import { ManageTab }               from '../../../shared';

@Component({
  selector   : 'uasp-func-edit',
  templateUrl: './func-edit.component.html',
})
export class FuncEditComponent implements OnInit {

  @Input() entry!: ManageTab<any>;

  form1!: FormGroup;
  rawData!: DefineVo;
  loading = false;
  submitting = false;

  usageTypes!: KuSelectItem[];
  statusItems!: KuSelectItem[];
  candidate!: CodeName[];
  newAction: CodeName = {
    code: '',
    name: '',
  }

  constructor(
    private fb: FormBuilder,
    private client: FuncClient,
    private funcService: FuncService,
    private tip: KuTipService,
    private events: KuEventService,
  ) {
    this.usageTypes = cloneDeep(USAGE_TYPES);
    this.statusItems = cloneDeep(USABLE_STATUS);
    this.candidate = this.funcService.candidate;
    this.registerEvents();
  }

  registerEvents(): void {
    this.events.subscribe(event => {
      if (event.type === FUNC_FORM_SAVE_CLOSE) {
        this.onSubmit(true);
      } else if (event.type === FUNC_FORM_DENY_CLOSE) {
        this.closeTab();
      }
    })
  }

  ngOnInit(): void {
    this.initData();
  }

  initData(): void {

    if (!this.entry.isNew && this.entry.businessKey) {
      this.loading = true;
      this.client.getById({
        id: this.entry.businessKey!,
      })?.subscribe(result => {
        this.loading = false;
        if (result.success) {
          this.rawData = result.data;
          this.initFormGroup();
          this.resetModify();
        } else {
          this.tip.error(result.message ?? '获取数据失败。');
        }
      });
    } else {
      this.rawData = {
        usage : '',
        status: '',
        sort  : 100,
        ...this.entry.data,
      };
      this.initFormGroup();
      this.resetModify();
    }
  }

  initFormGroup(): void {

    let config: any = {
      moduleId  : [this.rawData.moduleId],
      appId     : [this.rawData.appId],
      parentId  : [this.rawData.parentId],
      parentName: [this.rawData.parentName],
      name      : [this.rawData.name, [Validators.required]],
      type      : [this.rawData.type],
      icon      : [this.rawData.icon],
      sort      : [this.rawData.sort, [Validators.required]],
      status    : [this.rawData.status, [Validators.required]],
      remark    : [this.rawData.remark],
    };

    if (this.rawData.type === ModuleTypes.Module) {
      config.url = [this.rawData.url];
      config.code = [this.rawData.code, [Validators.required]];
      config.usage = [this.rawData.usage, [Validators.required]];
      config.actions = this.fb.array([]);
      if (!!this.rawData.actions) {
        for (const action of this.rawData.actions) {
          config.actions.push(this.fb.group({
            code: [action.code, [Validators.required]],
            name: [action.name, [Validators.required]],
          }));
        }
      }
    }

    this.form1 = this.fb.group(config);
  }


  get actions() {
    return this.form1.get('actions') as FormArray;
  }

  addCustomAction(): void {
    this.addAction({ ...this.newAction });
    this.newAction.code = '';
    this.newAction.name = '';
  }

  addAction(value: CodeName): void {
    let list = this.actions.getRawValue().filter(x => x.code === value.code);
    if (list.length > 0) {
      this.tip.error('该操作项已经存在。');
      return;
    }
    this.actions.push(this.fb.group({
      code: [value.code, [Validators.required]],
      name: [value.name, [Validators.required]],
    }));
  }

  removeAction(index: number): void {
    this.actions.removeAt(index);
  }

  resetModify(): void {
    this.entry.modified = false;
    this.form1.valueChanges.subscribe(next => {
      this.entry.modified = true;
    })
  }


  onRest() {
    this.form1.reset(this.rawData);
    if (!!this.rawData.actions) {
      this.actions.clear();
      for (const action of this.rawData.actions) {
        this.addAction(action);
      }
    }
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

  closeTab(): void {
    if (this.entry.isNew) {
      this.events.emit({
        type: FUNC_MAIN_TAB_NEW_CLOSE,
      });
    } else {
      this.events.emit({
        type: FUNC_MAIN_TAB_CLOSE_ACTIVE,
      })
    }
  }

  private postUpdate(closed: boolean) {

    if (!this.entry.modified) {
      //this.tip.info('表单没有被修改。');
      if (closed) {
        this.events.emit({
          type: FUNC_MAIN_TAB_CLOSE_ACTIVE,
        })
      }
      return;
    } else {
      this.submitting = true;
      this.client.update(this.form1.value)?.subscribe((result) => {
        this.submitting = false;
        if (result.success) {
          this.rawData = result.data;
          this.resetModify();
          this.tip.success('应用保存成功。', '成功');
          if (closed) {
            this.closeTab();
          } else {
            this.events.emit({
              type   : FUNC_MAIN_TAB_MODIFY,
              payload: {
                title      : this.form1.value.name,
                businessKey: this.form1.value.moduleId,
              },
            })
          }
          this.events.emit({
            type: FUNC_SAVE_COMPLETED,
          });
        } else {
          this.tip.error(result.message ?? '保存失败。');
        }
      });
    }
  }

  private postCreate(closed: boolean) {

    this.submitting = true;
    this.client.create(this.form1.value)?.subscribe((result) => {
      this.submitting = false;
      if (result.success) {
        this.tip.success('应用创建成功。', '成功');
        if (closed) {
          this.closeTab();
        } else {
          this.form1.patchValue({
            appId: result.data.appId,
          });
          this.resetModify();
          this.events.emit({
            type   : FUNC_MAIN_TAB_NEW_MODIFY,
            payload: {
              title      : result.data.name,
              businessKey: result.data.moduleId,
            },
          });
        }
        this.events.emit({
          type: FUNC_SAVE_COMPLETED,
        });
      } else {
        this.tip.error(result.message ?? '保存失败。');
      }
    });
  }
}
