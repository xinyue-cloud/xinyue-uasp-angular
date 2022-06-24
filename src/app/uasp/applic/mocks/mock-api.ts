import { Injectable }                   from '@angular/core';
import { HttpResult, KuMockApiService } from '@xinyue/core';
import Big from 'big.js';
import {
  URL_APPLIC_CREATE,
  URL_APPLIC_DELETE,
  URL_APPLIC_GET,
  URL_APPLIC_PAGE,
  URL_APPLIC_UPDATE,
}                      from '../services';
import { APPLIC_DATA } from './mock-data';
import { nanoid }      from 'nanoid';
import { cloneDeep }    from 'lodash-es';
import { APPLIC_TYPES } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ApplicMockApi {

  private clone_data = APPLIC_DATA;

  constructor(
    private mockApiService: KuMockApiService,
  ) {
    this.registerHandlers();
  }

  registerHandlers(): void {
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
        let _data = this.clone_data.filter(x => {
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
            totals: this.clone_data.length,
          }),
        };
      });
  }

  registerApplicGet(): void {

    this.mockApiService
      .onPost(URL_APPLIC_GET)
      .onReply((request) => {
        let _id = request.body.id;
        let _list = this.clone_data.filter(x => x.appId === _id);
        return {
          status: 200,
          body  : HttpResult.okBody(_list.length > 0 ? _list[0] : null),
        };
      });
  }

  registerApplicCreate(): void {

    this.mockApiService
      .onPost(URL_APPLIC_CREATE)
      .onReply((request) => {
        let _body = cloneDeep(request.body);
        _body.appId = nanoid();
        _body.statusName = APPLIC_TYPES.filter((x: any) => x.id === _body.status)[0].text;
        this.clone_data.push(_body);
        return {
          status: 200,
          body  : HttpResult.okBody(_body),
        };
      });
  }

  registerApplicUpdate(): void {

    this.mockApiService
      .onPost(URL_APPLIC_UPDATE)
      .onReply((request) => {
        let _id = request.params.get('id');
        let _list = this.clone_data.filter(x => x.appId === _id);
        if (_list.length > 0) {
          let _body = request.body;
          _list[0].code = _body.code;
          _list[0].name = _body.name;
          _list[0].remark = _body.remark;
          _list[0].type = _body.type;
          _list[0].url = _body.url;
          _list[0].sort = _body.sort;
          _list[0].needRelease = _body.needRelease;
          _list[0].status = _body.status;
          _list[0].statusName = APPLIC_TYPES.filter((x: any) => x.id === _body.status)[0].text;
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
        let _list = this.clone_data.filter(x => x.appId === _id);
        if (_list.length > 0) {
          this.clone_data.splice(this.clone_data.indexOf(_list[0]), 1);
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
