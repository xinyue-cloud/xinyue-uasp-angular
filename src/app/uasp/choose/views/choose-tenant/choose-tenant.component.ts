import { Component, OnInit }                         from '@angular/core';
import { HttpClient }                                from '@angular/common/http';
import { cloneDeep }                                 from 'lodash-es';
import { BsModalRef }                                from 'ngx-bootstrap/modal';
import { HttpResult, KuConfigService, KuTipService } from '@xinyue/core';

import { CoOption } from '../../models/tenant-option';
import { CoTenant } from './tenant-item';

@Component({
  selector   : 'uasp-choose-tenant',
  templateUrl: './choose-tenant.component.html',
})
export class ChooseTenantComponent implements OnInit {

  options!: CoOption<CoTenant>;

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
    this.filterData();
  }

  filterData(): void {
    this.filterCandidate();
    this.filterSelected();
  }

  filterCandidate(): void {
    this.candidate.dataSource = this.candidate.rawData.filter(x => {
      let st = this.candidate.searchText;
      return (!st || ((x.name.indexOf(st) >= 0) || (!!x.code && x.code.indexOf(st) >= 0)))
        && (!this.options.multiple || !this.hasSelected(x));
    });
  }

  filterSelected(): void {
    this.selected.dataSource = this.selected.rawData.filter(x => {
      let st = this.selected.searchText;
      return (!st || ((x.name.indexOf(st) >= 0) || (!!x.code && x.code.indexOf(st) >= 0)));
    });
  }

  reloadData(): void {
    if (!this.options.url || !this.options.method) {
      console.error('choose tenant: option need [url,method] args.');
    } else {
      this.requestData((data: CoTenant[]) => {
        this.candidate.rawData = data;
      });
    }
  }

  private requestData<T>(callback: (data: T[]) => void): void {

    const _url = this.config.apiUrl() + this.options.url;
    const _method = this.options.method!;
    this.http.request(_method, _url, {
      params: {},
      body  : {
        ...this.options.candidate,
        searchText: this.candidate.searchText,
      },
    }).subscribe((httpResult: HttpResult<T[]>) => {
      if (httpResult.success) {
        callback(httpResult.data);
      } else {
        this.tip.error(httpResult.message ?? '未能获取数据。');
      }
    });
  }

  hasSelected(row: CoTenant): boolean {
    return this.selected.rawData.filter(x => x.tenantId === row.tenantId).length > 0;
  }

  addSelected(row: CoTenant) {
    if (!this.options.multiple) {
      this.onClose(row);
    } else {
      this.selected.rawData.push(row);
      this.filterData();
    }
  }

  delSelected(row: CoTenant) {
    this.selected.rawData.splice(this.selected.rawData.indexOf(row), 1);
    this.filterData();
  }

  onConfirm() {
    this.onClose(this.selected.rawData);
  }

  onCancel() {
    this.bsModalRef.hide();
  }
}
