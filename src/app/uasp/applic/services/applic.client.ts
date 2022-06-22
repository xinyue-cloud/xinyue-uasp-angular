import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {
  Body, GET, HttpResult, KuHttpService, PageClause, PageList, Param, POST, Query,
} from '@xinyue/core';

import { ApplicQuery, ApplicVo, ApplicBody } from '../models';

export const URL_APPLIC_PAGE = '/applic/page';
export const URL_APPLIC_GET = '/applic/get';
export const URL_APPLIC_CREATE = '/applic/create';
export const URL_APPLIC_UPDATE = '/applic/update';
export const URL_APPLIC_DELETE = '/applic/delete';

@Injectable()
export class ApplicClient extends KuHttpService {

  @POST(URL_APPLIC_PAGE)
  queryPage(
    @Query pageClause: PageClause,
    @Body request: ApplicQuery,
  ): Observable<HttpResult<PageList<ApplicVo>>> | null {
    return null;
  }

  @POST(URL_APPLIC_GET)
  selectById(
    @Body id: { id: string },
  ): Observable<HttpResult<ApplicVo>> | null {
    return null;
  }

  @POST(URL_APPLIC_CREATE)
  create(
    @Body body: ApplicBody,
  ): Observable<HttpResult<ApplicVo>> | null {
    return null;
  }

  @POST(URL_APPLIC_UPDATE)
  update(
    @Param('id') id: string,
    @Body body: ApplicBody,
  ): Observable<HttpResult<ApplicVo>> | null {
    return null;
  }

  @POST(URL_APPLIC_DELETE)
  deleteById(
    @Param('id') id: string,
  ): Observable<HttpResult<ApplicVo>> | null {
    return null;
  }

}
