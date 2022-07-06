import { Component, Input, OnInit }     from '@angular/core';
import { DataStatus }                   from '@xinyue/uasp';
import { KuAlertService, KuSelectItem } from '@xinyue/core';

import { SweetAlertResult }      from 'sweetalert2'
import { ApplicClient }          from '../services';
import { ApplicTenantVo }        from '../models'
import { TableOption }           from '../../../shared';
import { ChooseService }                     from '../../choose/services/choose.service';
import { ApplicTabState, ApplicTenantState } from '../types';

@Component({
  selector   : 'uasp-tenant-list',
  templateUrl: './tenant-list.component.html',
})
export class TenantListComponent implements OnInit {

  @Input() state!: ApplicTenantState;

  // query
  statusItems: KuSelectItem[] = [
    { id: 'V', text: '正常使用' },
    { id: 'I', text: '已经过期' },
  ]

  get query(): {
    searchText: string,
    status: DataStatus,
  } {
    return this.state.query;
  }

  get option(): TableOption<ApplicTenantVo> {
    return this.state.option!;
  }

  constructor(
    private client: ApplicClient,
    private alert: KuAlertService,
    private choose: ChooseService,
  ) {
  }

  ngOnInit(): void {
    this.option.onReload = () => {
      this.onReload();
    };
  }

  onReload(): void {
    this.client.queryTenantPage({
      ...this.option.params,
    }, {
      ...this.query,
    })?.subscribe(httpResult => {
      this.option.dataSource = httpResult.data.rows;
      this.option.totalRecords = httpResult.data.totals;
    });
  }

  onCreate() {
    this.choose.tenant({
      multiple : true,
      candidate: [
        { tenantId: '001', name: '租户名称1' },
        { tenantId: '002', name: '租户名称2' },
        { tenantId: '003', name: '租户名称3' },
        { tenantId: '004', name: '租户名称4' },
        { tenantId: '005', name: '租户名称5' },
      ],
    }).subscribe((selected: any) => {
      this.client.createTenant({
        appId   : this.state.tab.businessKey!,
        tenantId: selected.tenantId,
        status  : DataStatus.Valid,
      });
    })
  }

  onRemove(row: ApplicTenantVo) {
    this.alert
      .confirm('确认要移除此租户吗？', '确认')
      .then((result: SweetAlertResult) => {
        if (result.isConfirmed) {
          console.info(result);
        }
      });
  }
}
