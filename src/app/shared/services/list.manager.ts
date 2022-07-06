import { KuAlertService }         from '@xinyue/core';
import { SweetAlertResult }       from 'sweetalert2';
import { ManageTab, TableOption } from '../types';
import { DefineVo }               from '../../uasp/func/models/define-vo';

export abstract class ListManager {

  // tabs
  mainTabIndex = 0;
  mainTabs: ManageTab<any>[] = [];

  // table
  option = new TableOption<any>();

  protected constructor(
    protected alert: KuAlertService,
  ) {
    this.option.onReload = () => {
      this.onReload();
    };
  }

  // -------------------------------- Manager View --------------------------------

  /**
   * 显示主列表选项卡。
   */
  showMainTabHome(): void {
    this.mainTabIndex = 0;
  }

  /**
   * 打开或显示一个选项卡。
   * @param tab
   */
  showMainTab(tab: ManageTab<any>): void {
    let rows = this.mainTabs.filter(x => x.businessKey === tab.businessKey);
    if (rows.length > 0) {
      this.mainTabIndex = this.mainTabs.indexOf(rows[0]) + 1;
    } else {
      this.mainTabs.push(tab);
      this.mainTabIndex = this.mainTabs.indexOf(tab) + 1;
    }
  }

  /**
   * 关闭一个指定的选项卡，如果内容发生过改变，将提示是否保存。
   * @param tab
   */
  closeMainTab(tab: ManageTab<any>): void {
    if (tab.modified) {
      this.alert.custom({
          confirmButtonText: '保存',
          denyButtonText   : '不保存',
          cancelButtonText : '取消',
        }, '该记录数据已经修改，是否需要保存？', '选择关闭方式',
      ).then((result: SweetAlertResult) => {
        if (result.isConfirmed) {
        } else if (result.isDenied) {
        }
      });
    } else {
      this.mainTabs.splice(this.mainTabs.indexOf(tab), 1);
      this.showMainTabHome();
    }
  }

  /**
   * 创建一个新的 Tab 选项卡，用于创建新记录。
   */
  createMainTab(): void {
    let rows = this.mainTabs.filter(x => x.isNew);
    if (rows.length > 0) {
      this.mainTabIndex = this.mainTabs.indexOf(rows[0]) + 1;
    } else {
      let row: ManageTab<any> = {
        title: '[未命名项]',
        isNew: true,
        data : undefined,
      };
      this.mainTabs.push(row);
      this.mainTabIndex = this.mainTabs.indexOf(row) + 1;
    }
  }

  // -------------------------------- Manager View --------------------------------

  abstract onReload(): void;


}
