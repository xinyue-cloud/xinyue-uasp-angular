import { Injectable }  from '@angular/core';
import { HttpRequest } from '@angular/common/http'

import { HttpResult, KuMockApiService } from '@xinyue/core';
import { DATA_STATUS, DataStatus }      from '@xinyue/uasp';

import {
  URL_APPLIC_CREATE,
  URL_APPLIC_DELETE,
  URL_APPLIC_GET,
  URL_APPLIC_PAGE,
  URL_APPLIC_TENANT_CREATE,
  URL_APPLIC_TENANT_DELETE,
  URL_APPLIC_TENANT_PAGE,
  URL_APPLIC_UPDATE,
}                             from '../services';
import { APPLIC_DATA }        from './applic.data';
import { nanoid }             from 'nanoid';
import { cloneDeep }          from 'lodash-es';
import {
  APPLIC_TYPES, ApplicBody, ApplicVo,
  ApplicTenantBody, ApplicTenantQuery, ApplicTenantVo,
}                             from '../models';
import { APPLIC_TENANT_DATA } from './tenant.data'

import { TENANT_DATA } from '../../tenant';

@Injectable({
  providedIn: 'root',
})
export class ApplicMockApi {

  private applic_data = cloneDeep(APPLIC_DATA);
  private tenant_data = cloneDeep(APPLIC_TENANT_DATA);

  constructor(
    private mockApiService: KuMockApiService,
  ) {
    this.registerApplicHandlers();
    this.registerTenantHandlers();
  }

  /** Applic */

  registerApplicHandlers(): void {
    this.registerApplicPage();
    this.registerApplicGet();
    this.registerApplicCreate();
    this.registerApplicUpdate();
    this.registerApplicDelete();
  }

  registerApplicPage(): void {

    this.mockApiService
      .onPost(URL_APPLIC_PAGE)
      .onReply((request) => {
        let _params = {
          page   : Number(request.params.get('page') ?? 0),
          rows   : Number(request.params.get('limit') ?? 15),
          orderby: request.params.get('orderby'),
        };
        let _body = request.body;
        let _data = this.applic_data.filter(x => {
          let result = true;
          if (!!_body.status) {
            result = x.status === _body.status
          }
          return result;
        });
        let _start = _params.page * _params.rows;
        let _rows = _data.slice(_start, _start + _params.rows);
        return {
          status: 200,
          body  : HttpResult.okBody({
            rows  : _rows,
            totals: this.applic_data.length,
          }),
        };
      });
  }

  registerApplicGet(): void {

    this.mockApiService
      .onPost(URL_APPLIC_GET)
      .onReply((request) => {
        let _id = request.body.id;
        let _list = this.applic_data.filter(x => x.appId === _id);
        return {
          status: 200,
          body  : HttpResult.okBody(_list.length > 0 ? _list[0] : null),
        };
      });
  }

  registerApplicCreate(): void {

    this.mockApiService
      .onPost(URL_APPLIC_CREATE)
      .onReply((request: HttpRequest<ApplicBody>) => {
        let _body = request.body!;
        let _model: ApplicVo = {
          appId      : nanoid(),
          code       : _body.code,
          createTime : new Date(),
          creatorId  : 'USER_0001',
          creatorName: '管理员',
          url        : _body.url,
          level      : _body.level,
          name       : _body.name,
          needRelease: _body.needRelease,
          sort       : _body.sort,
          type       : _body.type,
          typeName   : APPLIC_TYPES.filter((x: any) => x.id === _body.type)[0].text,
          status     : _body!.status,
          statusName : DATA_STATUS.filter((x: any) => x.id === _body.status)[0].text,
        };
        this.applic_data.push(_model);
        return {
          status: 200,
          body  : HttpResult.okBody(_model),
        };
      });
  }

  registerApplicUpdate(): void {

    this.mockApiService
      .onPost(URL_APPLIC_UPDATE)
      .onReply((request: HttpRequest<ApplicBody>) => {
        let _id = request.body!.appId;
        let _rows = this.applic_data.filter(x => x.appId === _id);
        if (_rows.length > 0) {
          let _body = request.body!;
          _rows[0].code = _body.code;
          _rows[0].name = _body.name;
          _rows[0].remark = _body.remark;
          _rows[0].type = _body.type;
          _rows[0].typeName = APPLIC_TYPES.filter((x: any) => x.id === _body.type)[0].text;
          _rows[0].url = _body.url;
          _rows[0].sort = _body.sort;
          _rows[0].needRelease = _body.needRelease;
          _rows[0].status = _body.status;
          _rows[0].statusName = DATA_STATUS.filter((x: any) => x.id === _body.status)[0].text;
        }
        return {
          status: 200,
          body  : HttpResult.okBody(request.body),
        };
      });
  }

  registerApplicDelete(): void {

    this.mockApiService
      .onPost(URL_APPLIC_DELETE)
      .onReply((request) => {
        let _id = request.params.get('id');
        let _rows = this.applic_data.filter(x => x.appId === _id);
        if (_rows.length > 0) {
          this.applic_data.splice(this.applic_data.indexOf(_rows[0]), 1);
          return {
            status: 200,
            body  : HttpResult.okBody(request.body),
          };
        } else {
          return {
            status: 200,
            body  : HttpResult.error('要删除的数据不存在。'),
          };
        }
      });
  }

  /** Tenant */

  registerTenantHandlers(): void {
    this.registerApplicTenantPage();
    this.registerApplicTenantCreate();
    this.registerApplicTenantDelete();
  }

  registerApplicTenantPage(): void {

    this.mockApiService
      .onPost(URL_APPLIC_TENANT_PAGE)
      .onReply((request: HttpRequest<ApplicTenantQuery>) => {
        let _params = {
          page   : Number(request.params.get('page') ?? 0),
          rows   : Number(request.params.get('limit') ?? 15),
          orderby: request.params.get('orderby'),
        };
        let _body = request.body!;
        let _data = this.tenant_data.filter(x => {
          let result = true;
          if (!!_body.status) {
            result = x.status === _body.status
          }
          return result;
        });
        let _start = _params.page * _params.rows;
        let _rows = _data.slice(_start, _start + _params.rows);
        return {
          status: 200,
          body  : HttpResult.okBody({
            rows  : _rows,
            totals: this.tenant_data.length,
          }),
        };
      });
  }

  registerApplicTenantCreate(): void {

    this.mockApiService
      .onPost(URL_APPLIC_TENANT_CREATE)
      .onReply((request: HttpRequest<ApplicTenantBody>) => {
        let _body = request.body!;
        let _model: ApplicTenantVo = {
          tenantAppId: nanoid(),
          appId      : _body.appId,
          expireTime : _body.expireTime,
          createTime : new Date(),
          creatorId  : 'USER_0001',
          creatorName: '管理员',
          status     : DataStatus.Valid,
          statusName : DATA_STATUS.filter((x: any) => x.id === _body.status)[0].text,
          tenantId   : _body.tenantId,
          tenantName : TENANT_DATA.filter(x => x.tenantId === _body.tenantId)[0].name,
        };
        this.tenant_data.push(_model);
        return {
          status: 200,
          body  : HttpResult.okBody(_model),
        };
      });
  }

  registerApplicTenantDelete(): void {

    this.mockApiService
      .onPost(URL_APPLIC_TENANT_DELETE)
      .onReply((request) => {
        let _id = request.params.get('id');
        let _list = this.tenant_data.filter(x => x.tenantAppId === _id);
        if (_list.length > 0) {
          this.tenant_data.splice(this.tenant_data.indexOf(_list[0]), 1);
          return {
            status: 200,
            body  : HttpResult.okBody(request.body),
          };
        } else {
          return {
            status: 200,
            body  : HttpResult.error('要删除的数据不存在。'),
          };
        }
      });
  }

}
