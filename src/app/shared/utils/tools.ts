import { KuTreeNode }              from '@xinyue/core';
import { LazyLoadEvent, TreeNode } from 'primeng/api';

export function treeConvert(dataSource: KuTreeNode[], callback: ((entry: KuTreeNode) => TreeNode)): TreeNode[] {

  let result: TreeNode[] = [];
  if (!!dataSource) {
    for (const node of dataSource) {
      let nn: TreeNode = callback(node);
      if (!!node.children) {
        let children = treeConvert(node.children, callback);
        if (!!children) {
          nn.children = children;
          for (const child of nn.children) {
            child.parent = nn;
          }
        }
      }
      result.push(nn);
    }
  }
  return result;
}

export function findTreeNode(key: string, nodes: TreeNode[]): TreeNode | any {

  for (const node of nodes) {
    if (node.key === key) {
      return node;
    }
    if (!!node.children) {
      const child = findTreeNode(key, node.children);
      if (!!child) {
        return child;
      }
    }
  }
  return null;
}

export function tableOrderBy(event: LazyLoadEvent): any {
  let orderby = '';
  if (event.multiSortMeta) {
    for (let i in event.multiSortMeta) {
      orderby += event.multiSortMeta[i].field + (event.multiSortMeta[i].order === 1 ? '+desc' : '');
    }
  } else if (event.sortField) {
    orderby = event.sortField + (event.sortOrder === 1 ? '+desc' : '');
  }
  return orderby;
}
