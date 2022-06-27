import { Component, OnInit } from '@angular/core';
import { HttpClient }        from '@angular/common/http';
import { BsModalRef }        from 'ngx-bootstrap/modal';

import { HttpResult, KuConfigService, KuTipService } from '@xinyue/core';
import { CoTenantOption }                            from './tenant-option';
import { CoTenant }                                  from './tenant-item';
import { cloneDeep }                                 from 'lodash-es';

@Component({
  selector   : 'uasp-choose-tenant',
  templateUrl: './choose-tenant.component.html',
})
export class ChooseTenantComponent implements OnInit {

  options!: CoTenantOption;

  candidate: {
    rawData: CoTenant[];
    dataSource: CoTenant[];
    searchText?: string
  } = {
    rawData   : [],
    dataSource: [],
  };

  selected: {
    rawData: CoTenant[];
    dataSource: CoTenant[];
    searchText?: string
  } = {
    rawData   : [],
    dataSource: [],
  };

  onClose!: (result: CoTenant | CoTenant[]) => void;

  constructor(
    private bsModalRef: BsModalRef,
    private http: HttpClient,
    private tip: KuTipService,
    private config: KuConfigService,
  ) {
  }

  ngOnInit(): void {
    if (!!this.options.candidate) {
      this.candidate.rawData = cloneDeep(this.options.candidate);
    } else {
      this.reloadData();
    }
    if (!!this.options.selected) {
      this.selected.rawData = cloneDeep(this.options.selected);
    }
    this.updateFilter();
  }

  updateFilter(): void {
    this.candidate.dataSource = this.candidate.rawData.filter(x => {
      let st = this.candidate.searchText;
      return (!st || ((x.name.indexOf(st) >= 0) || (!!x.code && x.code.indexOf(st) >= 0)))
        && (!this.options.multiple || !this.hasSelected(x));
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
      const _method = this.options.method;
      this.http.request(_method, _url, {
        body: {
          ...this.options.candidate,
          searchText: this.candidate.searchText,
        },
      }).subscribe((httpResult: HttpResult<CoTenant[]>) => {
        if (httpResult.success) {
          this.candidate.rawData = httpResult.data;
        } else {
          this.tip.error(httpResult.message ?? '未能获取数据。');
        }
      });
    }
  }

  hasSelected(row: CoTenant): boolean {
    return this.selected.rawData.filter(x => x.tenantId === row.tenantId).length > 0;
  }

  addSelected(row: CoTenant) {
    if (!this.options.multiple) {
      this.onClose(row);
    } else {
      this.selected.rawData.push(row);
      this.updateFilter();
    }
  }

  delSelected(row: CoTenant) {
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
