import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  GET, POST, Body, Param,
  HttpResult, KuHttpService,
  SelectItem, TreeNode,
}                     from '@xinyue/core';
import { IdBody }     from '@xinyue/uasp';
import { DefineVo }   from '../models/define-vo';

@Injectable()
export class FuncClient extends KuHttpService {

  // choose

  @GET('/module/choose/applic')
  chooseApplic(): Observable<HttpResult<SelectItem[]>> | null {
    return null;
  }

  @GET('/module/tree')
  chooseTree(
    @Param('appId') appId: string,
  ): Observable<HttpResult<TreeNode[]>> | null {
    return null;
  }

  @POST('/module/get')
  getById(
    @Body body: IdBody,
  ): Observable<HttpResult<DefineVo>> | null {
    return null;
  }

}
