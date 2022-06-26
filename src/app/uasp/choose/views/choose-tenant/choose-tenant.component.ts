import { Component, OnInit } from '@angular/core';
import { HttpClient }        from '@angular/common/http';
import { BsModalRef }        from 'ngx-bootstrap/modal';

import { TenantOption }                              from './tenant-option';
import { TenantItem }                                from './tenant-item';
import { HttpResult, KuConfigService, KuTipService } from '@xinyue/core';

@Component({
  selector   : 'uasp-choose-tenant',
  templateUrl: './choose-tenant.component.html',
})
export class ChooseTenantComponent implements OnInit {

  options!: TenantOption;

  candidate: {
    rawData: TenantItem[];
    dataSource: TenantItem[];
    searchText?: string
  } = {
    rawData   : [],
    dataSource: [],
  };
  selected: {
    rawData: TenantItem[];
    dataSource: TenantItem[];
    searchText?: string
  } = {
    rawData   : [],
    dataSource: [],
  };

  onClose!: (result: any) => void;

  constructor(
    private bsModalRef: BsModalRef,
    private http: HttpClient,
    private tip: KuTipService,
    private config: KuConfigService,
  ) {
  }

  ngOnInit(): void {
    if (!!this.options.candidate) {
      this.candidate.rawData = this.options.candidate;
    } else {
      this.reloadData();
    }
    if (!!this.options.selected) {
      this.selected.rawData = this.options.selected;
    }
    this.updateFilter();
  }

  get title(): string {
    return this.options.title ?? '选择租户';
  }

  get multiple(): boolean {
    return this.options.multiple ?? false;
  }

  updateFilter(): void {
    this.candidate.dataSource = this.candidate.rawData.filter(x => {
      let st = this.candidate.searchText;
      return (!st || ((x.name.indexOf(st) >= 0) || (!!x.code && x.code.indexOf(st) >= 0))) && (!this.multiple || !this.hasSelected(x));
    });
    this.selected.dataSource = this.selected.rawData.filter(x => {
      let st = this.selected.searchText;
      return (!st || ((x.name.indexOf(st) >= 0) || (!!x.code && x.code.indexOf(st) >= 0)));
    });
  }

  reloadData(): void {
    if (!this.options.url || !this.options.method) {
      console.error('choose tenant: option need [url,method] args.');
    } else {
      const _url = this.config.apiUrl() + this.options.url;
      this.http.request(this.options.method, _url, {
        body: {
          searchText: this.candidate.searchText,
        },
      }).subscribe((httpResult: HttpResult<TenantItem[]>) => {
        if (httpResult.success) {
          this.candidate.rawData = httpResult.data;
        } else {
          this.tip.error(httpResult.message ?? '未能获取数据。');
        }
      });
    }
  }

  hasSelected(row: TenantItem): boolean {
    return this.selected.rawData.filter(x => x.tenantId === row.tenantId).length > 0;
  }

  addSelected(row: TenantItem) {
    if (!this.multiple) {
      this.onClose(row);
    } else {
      this.selected.rawData.push(row);
      this.updateFilter();
    }
  }

  delSelected(row: TenantItem) {
    this.selected.rawData.splice(this.selected.rawData.indexOf(row), 1);
    this.updateFilter();
  }

  onConfirm() {
    this.onClose(this.selected.rawData);
  }

  onCancel() {
    this.bsModalRef.hide();
  }
}
