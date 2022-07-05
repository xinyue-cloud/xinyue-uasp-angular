import { Component, OnInit }                                      from '@angular/core';
import { KuEventService, KuSelectItem, KuTipService, KuTreeNode } from '@xinyue/core';

import { TreeNode }                  from 'primeng/api';
import { FuncClient }                from '../services';
import {
  FUNC_MAIN_TAB_SHOW_HOME,
  FUNC_SAVE_COMPLETED,
  FUNC_TREE_SELECT_NODE,
}                                    from '../event.types';
import { findTreeNode, treeConvert } from '../../../shared';

function treeIcon(source: KuTreeNode, target: TreeNode): void {
  if (source.id === 'ROOT') {
    target.icon = "fas fa-home";
  } else if (source.type === 'C') {
    if (!!source.icon) {
      target.icon = source.icon;
    } else {
      target.collapsedIcon = "fas fa-folder";
      target.expandedIcon = "fas fa-folder-open";
    }
  } else if (source.type === 'D') {
    target.icon = "fas fa-minus";
  }
}

@Component({
  selector   : 'uasp-func-tree',
  templateUrl: './func-tree.component.html',
})
export class FuncTreeComponent implements OnInit {

  applicData!: KuSelectItem[];
  treeData!: TreeNode[];

  appId!: string;
  selectedNode?: TreeNode;

  constructor(
    private funcClient: FuncClient,
    private tip: KuTipService,
    private eventService: KuEventService,
  ) {
    eventService.subscribe(event => {
      if (event.type === FUNC_SAVE_COMPLETED) {
        this.onReload();
      }
    });
  }

  ngOnInit(): void {
    this.funcClient.chooseApplic()?.subscribe(result => {
      this.applicData = result.data;
      if (!!result.data) {
        this.appId = result.data[0].id;
        this.onReload();
      }
    });
  }

  onReload(): void {
    this.funcClient.chooseTree({
      appId: this.appId,
    })?.subscribe(result => {
      if (result.success) {
        this.treeData = treeConvert(result.data, (node: KuTreeNode) => {
          let target = {
            key     : node.id,
            label   : node.text,
            type    : node.type,
            leaf    : !node.children,
            expanded: !!node.children,
            data    : node.data,
          };
          treeIcon(node, target);
          return target;
        });
        if (!!this.selectedNode) {
          this.selectedNode = findTreeNode(this.selectedNode.key!, this.treeData);
        }
        if (!this.selectedNode) {
          this.selectedNode = this.treeData[0];
        }
        this.nodeSelect();
      } else {
        this.tip.error(result.message ?? '获取数据失败。');
      }
    })
  }

  nodeSelect(): void {
    this.eventService.emit({
      type   : FUNC_TREE_SELECT_NODE,
      payload: {
        appId       : this.appId,
        selectedNode: this.selectedNode,
      },
    });
    this.eventService.emit({
      type: FUNC_MAIN_TAB_SHOW_HOME,
    })
  }
}
