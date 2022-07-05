import { Component, OnDestroy, OnInit } from '@angular/core';
import { KuEventService }               from '@xinyue/core';

import { DefineVo }     from '../models/define-vo';
import { FuncClient }   from '../services';
import {
  FUNC_LIST_QUERY,
  FUNC_MAIN_TAB_CREATE,
  FUNC_MAIN_TAB_VIEW, FUNC_SAVE_COMPLETED, FUNC_TREE_SELECT_NODE,
}                       from '../event.types';
import { TableOption }  from '../../../shared/types';
import { TreeNode }     from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector   : 'uasp-func-list',
  templateUrl: './func-list.component.html',
})
export class FuncListComponent implements OnInit, OnDestroy {

  selectedNode: TreeNode = {
    label: '当前选中节点',
  };

  query = {
    searchText  : '',
    appId       : '',
    parentId    : '',
    parentIsNull: false,
  }

  // table
  option = new TableOption<DefineVo>();

  eventSubscribe: Subscription;

  constructor(
    private funcClient: FuncClient,
    private eventService: KuEventService,
  ) {
    this.eventSubscribe = eventService.subscribe(event => {
      if (event.type === FUNC_SAVE_COMPLETED) {
        //this.onReload();
      } else if (event.type === FUNC_TREE_SELECT_NODE) {
        this.query.appId = event.payload.appId;
        let node = this.selectedNode = event.payload.selectedNode;
        if (!!node) {
          this.query.parentId = node.key !== 'ROOT' ? node.key : ''
          this.query.parentIsNull = node.key === 'ROOT';
        }
        this.onReload();
      }
    });
    this.option.onReloadData = () => {
      this.onReload();
    };
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.eventSubscribe.unsubscribe();
  }

  onReload() {
    if (!!this.query.appId) {
      this.funcClient.queryPage({
        ...this.option.params,
      }, {
        ...this.query,
      })?.subscribe(httpResult => {
        this.option.dataSource = httpResult.data.rows;
        this.option.totalRecords = httpResult.data.totals;
      });
    }
  }

  onCreate(type: string) {
    this.eventService.emit({
      type   : FUNC_MAIN_TAB_CREATE,
      payload: {
        type      : type,
        appId     : this.query.appId,
        parentId  : this.query.parentId,
        parentName: this.selectedNode.label,
      },
    });
  }

  onView(row: DefineVo) {
    this.eventService.emit({
      type   : FUNC_MAIN_TAB_VIEW,
      payload: {
        title      : row.name,
        businessKey: row.moduleId,
        active     : 0,
      },
    });
  }

}
