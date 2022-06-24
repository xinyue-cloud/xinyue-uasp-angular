import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {
  Body, Param, POST, Query,
  HttpResult, KuHttpService, PageClause, PageList,
} from '@xinyue/core';

import {
  ApplicQuery, ApplicVo, ApplicBody,
  ApplicTenantQuery, ApplicTenantVo, ApplicTenantBody,
} from '../models';

export const URL_APPLIC_PAGE = '/applic/page';
export const URL_APPLIC_GET = '/applic/get';
export const URL_APPLIC_CREATE = '/applic/create';
export const URL_APPLIC_UPDATE = '/applic/update';
export const URL_APPLIC_DELETE = '/applic/delete';

export const URL_APPLIC_TENANT_PAGE = '/applic/tenant/page';
export const URL_APPLIC_TENANT_CREATE = '/applic/tenant/create';
export const URL_APPLIC_TENANT_UPDATE = '/applic/tenant/update';
export const URL_APPLIC_TENANT_DELETE = '/applic/tenant/delete';

@Injectable()
export class ApplicClient extends KuHttpService {

  // applic

  @POST(URL_APPLIC_PAGE)
  queryPage(
    @Query pageClause: PageClause,
    @Body request: ApplicQuery,
  ): Observable<HttpResult<PageList<ApplicVo>>> | null {
    return null;
  }

  @POST(URL_APPLIC_GET)
  getById(
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

  // tenant-applic

  @POST(URL_APPLIC_TENANT_PAGE)
  queryTenantPage(
    @Query pageClause: PageClause,
    @Body request: ApplicTenantQuery,
  ): Observable<HttpResult<PageList<ApplicTenantVo>>> | null {
    return null;
  }

  @POST(URL_APPLIC_TENANT_CREATE)
  createTenant(
    @Body body: ApplicTenantBody,
  ): Observable<HttpResult<ApplicTenantVo>> | null {
    return null;
  }

  @POST(URL_APPLIC_TENANT_UPDATE)
  updateTenant(
    @Param('id') id: string,
    @Body body: ApplicTenantBody,
  ): Observable<HttpResult<ApplicTenantVo>> | null {
    return null;
  }

  @POST(URL_APPLIC_TENANT_DELETE)
  deleteTenantById(
    @Param('id') id: string,
  ): Observable<HttpResult<ApplicTenantVo>> | null {
    return null;
  }


}
