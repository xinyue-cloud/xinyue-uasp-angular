import { Injectable }                   from '@angular/core';
import { HttpResult, KuMockApiService } from '@xinyue/core';

import {
  URL_APPLIC_CREATE,
  URL_APPLIC_DELETE,
  URL_APPLIC_GET,
  URL_APPLIC_PAGE,
  URL_APPLIC_UPDATE,
}                      from '../services';
import { APPLIC_DATA } from './applic-data';

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
        return {
          status: 200,
          body  : HttpResult.okBody(request.body),
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
          _list[0].code = request.body.code;
          _list[0].name = request.body.name;
          _list[0].remark = request.body.remark;
          _list[0].type = request.body.type;
          _list[0].url = request.body.url;
          _list[0].sort = request.body.sort;
          _list[0].needRelease = request.body.needRelease;
          _list[0].status = request.body.status;
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
