import {
  AfterContentInit,
  Component,
  ContentChildren,
  HostBinding,
  Input,
  OnInit,
  QueryList,
  TemplateRef,
} from '@angular/core';

import { KuContentTemplate }  from '../../apis';
import { KtTabItemComponent } from './tab-item.component';

export type TabThemes = 'primary' | 'info' | 'warning' | 'success' | 'danger' | string;

@Component({
  selector   : 'ku-tab-view,[ku-tab-view]',
  templateUrl: './tab-view.component.html',
})
export class KtTabViewComponent implements OnInit, AfterContentInit {

  @Input() isCard = true;
  @Input() headerClass!: string;
  @Input() navClass!: string;
  @Input() contentClass!: string;
  @Input() cardTheme!: TabThemes;
  @Input() cardOutline = false;
  @Input() tabOutline = false;
  @Input() tabPills = false;
  @Input() justified = false;
  @Input() vertical = false;

  @Input() tabRightAlign = false;
  @Input() tabAreaClass: any = 'col-5 col-sm-3';
  @Input() tabAreaStyles: any;
  @Input() contentAreaClass: any = 'col-7 col-sm-9';
  @Input() contentAreaStyles: any;

  @ContentChildren(KuContentTemplate)
  templates!: QueryList<KuContentTemplate>;
  items: KtTabItemComponent[] = [];
  contentHeaderTemplate!: TemplateRef<any>;
  contentFooterTemplate!: TemplateRef<any>;

  @HostBinding('class')
  get hostClass(): string {
    let styleClass = '';
    if (this.isCard && !this.vertical) {
      styleClass += 'card card-tabs';
      if (this.cardTheme) {
        styleClass += ' card-' + this.cardTheme;
      }
      if (this.cardOutline || this.tabOutline) {
        styleClass += ' card-outline';
        if (this.tabOutline) {
          styleClass += ' card-outline-tabs';
        }
      }
    } else if (this.vertical) {
      styleClass += ' row';
    }
    return styleClass;
  }

  constructor() {
  }

  ngAfterContentInit(): void {
    this.templates.forEach((item) => {
      switch (item.getType()) {
        case 'content-header':
          this.contentHeaderTemplate = item.template;
          break;
        case 'content-footer':
          this.contentFooterTemplate = item.template;
          break;
      }
    });
  }

  ngOnInit(): void {
  }

  tabItemClick($event: MouseEvent, tab: KtTabItemComponent, index: number): void {
    tab.active = true;
  }

  /**
   * 检查是否有可供激活的面板。
   * @param index 当前将要关闭的面板索引。
   */
  private hasAvailableTabs(index: number): boolean {

    const length = this.items.length;
    if (!length) {
      // 选项卡已经没有面板了
      return false;
    }

    for (let i = 0; i < length; i++) {
      if (!this.items[i].disabled && i !== index) {
        // 发现未禁用且不是当前面板
        return true;
      }
    }

    return false;
  }

  /**
   * 获取最近的一个面板索引值。
   * @param index 当前将要关闭的面板索引。
   */
  private getClosestTabIndex(index: number): number {

    const length = this.items.length;
    if (!length) {
      return -1;
    }

    for (let step = 1; step <= length; step++) {
      const prevIndex = index - step;
      if (this.items[prevIndex] && !this.items[prevIndex].disabled) {
        return prevIndex;
      }
      const nextIndex = index + step;
      if (this.items[nextIndex] && !this.items[nextIndex].disabled) {
        return nextIndex;
      }
    }

    return -1;
  }

  addItem(item: KtTabItemComponent): void {
    this.items.push(item);
  }

  removeItem(item: KtTabItemComponent): void {
    const index = this.items.indexOf(item);
    if (index === -1) {
      return;
    }

    if (item.active && this.hasAvailableTabs(index)) {
      const tabIndex = this.getClosestTabIndex(index);
      this.items[tabIndex].active = true;
    }

    this.items.splice(index, 1);
  }

}
