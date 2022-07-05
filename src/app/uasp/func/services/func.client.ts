import { Injectable }  from '@angular/core';
import { Observable }  from 'rxjs';
import {
  GET, POST, Body, Param,
  HttpResult, KuHttpService,
  KuSelectItem, KuTreeNode, Query, PageClause, CodeName,
}                      from '@xinyue/core';
import { IdBody }      from '@xinyue/uasp';
import { DefineVo }    from '../models/define-vo';
import { TreeQuery }   from '../models/tree-query'
import { DefineQuery } from '../models/define-query'
import { DefineBody }  from '../models/define-body';

export const URL_CHOOSE_APPLIC = '/module/choose/applic'
export const URL_MODULE_CANDIDATE_ACTIONS = '/module/candidate/actions'
export const URL_MODULE_TREE = '/module/tree'
export const URL_MODULE_PAGE = '/module/page'
export const URL_MODULE_GET = '/module/get'
export const URL_MODULE_CREATE = '/module/create'
export const URL_MODULE_UPDATE = '/module/update'
export const URL_MODULE_DELETE = '/module/delete'

@Injectable()
export class FuncClient extends KuHttpService {

  // choose

  @POST(URL_CHOOSE_APPLIC)
  chooseApplic(): Observable<HttpResult<KuSelectItem[]>> | null {
    return null;
  }

  @POST(URL_MODULE_CANDIDATE_ACTIONS)
  candidateActions(): Observable<HttpResult<CodeName[]>> | null {
    return null;
  }

  @POST(URL_MODULE_TREE)
  chooseTree(
    @Body query: TreeQuery,
  ): Observable<HttpResult<KuTreeNode[]>> | null {
    return null;
  }

  @POST(URL_MODULE_PAGE)
  queryPage(
    @Query pageClause: PageClause,
    @Body query: DefineQuery,
  ): Observable<HttpResult<DefineVo>> | null {
    return null;
  }

  @POST(URL_MODULE_GET)
  getById(
    @Body query: IdBody,
  ): Observable<HttpResult<DefineVo>> | null {
    return null;
  }

  @POST(URL_MODULE_CREATE)
  create(
    @Body body: DefineBody,
  ): Observable<HttpResult<DefineVo>> | null {
    return null;
  }

  @POST(URL_MODULE_UPDATE)
  update(
    @Body body: DefineBody,
  ): Observable<HttpResult<any>> | null {
    return null;
  }

  @POST(URL_MODULE_DELETE)
  delete(
    @Body body: IdBody,
  ): Observable<HttpResult<any>> | null {
    return null;
  }

}
