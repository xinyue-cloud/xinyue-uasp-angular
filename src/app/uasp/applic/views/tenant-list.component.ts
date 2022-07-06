import { Component, Input, OnInit }     from '@angular/core';
import { DataStatus }                   from '@xinyue/uasp';
import { KuAlertService, KuSelectItem } from '@xinyue/core';
import { SweetAlertResult }             from 'sweetalert2'

import { ApplicTenantVo } from '../models'
import { ApplicClient }   from '../services';
import { TenantState }    from '../types';
import { ChooseService }  from '../../choose';

@Component({
  selector   : 'uasp-tenant-list',
  templateUrl: './tenant-list.component.html',
})
export class TenantListComponent implements OnInit {

  @Input() state!: TenantState;

  // query
  statusItems: KuSelectItem[] = [
    { id: 'V', text: '正常使用' },
    { id: 'I', text: '已经过期' },
  ]

  constructor(
    private client: ApplicClient,
    private alert: KuAlertService,
    private choose: ChooseService,
  ) {
  }

  ngOnInit(): void {
    this.state.option.onReload = () => {
      this.onReload();
    };
  }

  onReload(): void {
    this.client.queryTenantPage({
      ...this.state.option.params,
    }, {
      ...this.state.query,
    })?.subscribe(httpResult => {
      this.state.option.dataSource = httpResult.data.rows;
      this.state.option.totalRecords = httpResult.data.totals;
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
