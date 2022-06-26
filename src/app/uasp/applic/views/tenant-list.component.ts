import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { MainTab, TableOption }                        from '@xinyue/uasp';
import { KuAlertService, KuEventService, SelectItem }  from '@xinyue/core';

import { ApplicClient, ApplicService } from '../services';
import { ApplicTenantVo }              from '../models'
import { SweetAlertResult }            from 'sweetalert2'
import { ChooseService }               from '../../choose/services/choose.service';

@Component({
  selector   : 'uasp-tenant-list',
  templateUrl: './tenant-list.component.html',
})
export class TenantListComponent implements OnInit {

  @Input() entry!: MainTab;

  // query
  statusItems: SelectItem[] = [
    { id: 'V', text: '正常使用' },
    { id: 'I', text: '已经过期' },
  ]
  query = {
    searchText : '',
    statusValue: '',
  }

  // table
  option = new TableOption<ApplicTenantVo>();

  constructor(
    private cdf: ChangeDetectorRef,
    private applicClient: ApplicClient,
    private applicService: ApplicService,
    private eventService: KuEventService,
    private alertService: KuAlertService,
    private chooseService: ChooseService,
  ) {
    this.option.onReloadData = () => {
      this.onReload();
    };
  }

  ngOnInit(): void {
  }

  onReload(): void {
    this.applicClient.queryTenantPage({
      page   : this.option.page,
      limit  : this.option.limit,
      orderby: this.option.orderby,
    }, {
      searchText: this.query.searchText,
      status    : this.query.statusValue,
    })?.subscribe(httpResult => {
      this.option.dataSource = httpResult.data.rows;
      this.option.totalRecords = httpResult.data.totals;
    });
  }

  onCreate() {
    this.chooseService.tenant({
      multiple : true,
      candidate: [
        { tenantId: '001', name: '租户名称1' },
        { tenantId: '002', name: '租户名称2' },
        { tenantId: '003', name: '租户名称3' },
        { tenantId: '004', name: '租户名称4' },
        { tenantId: '005', name: '租户名称5' },
        { tenantId: '006', name: '租户名称6' },
        { tenantId: '007', name: '租户名称7' },
        { tenantId: '008', name: '租户名称8' },
        { tenantId: '009', name: '租户名称9' },
        { tenantId: '010', name: '租户名称10' },
        { tenantId: '011', name: '租户名称11' },
        { tenantId: '012', name: '租户名称12' },
        { tenantId: '013', name: '租户名称13' },
      ],
    }).subscribe(selected => {
      console.info('chooseService -> selected: ', selected);
    })
  }

  onRemove(row: ApplicTenantVo) {
    this.alertService
      .confirm('确认要移除此租户吗？', '确认')
      .then((result: SweetAlertResult) => {
        console.info('Confirm -> result: ', result);
        if (result.isConfirmed) {

        }
      });
  }
}
