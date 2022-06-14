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
import { KtTabViewComponent } from './tab-view.component';

@Component({
  selector   : 'ku-tab-item,[ku-tab-item]',
  templateUrl: './tab-item.component.html',
  host       : {
    '[class.tab-pane]': 'true',
    '[class.fade]'    : 'true',
  },
})
export class KtTabItemComponent implements OnInit, AfterContentInit {

  @Input() title!: string;
  @Input() disabled = false;
  @Input() loading = false;
  @Input() navItemClass = '';
  @Input() navItemStyles: any;
  @Input() loadingText = '加载中...';
  @Input() overlayDark = false;
  @Input() removable = false;

  @HostBinding('class')
  @Input() contentClass = '';

  @Input()
  @HostBinding('class.show')
  @HostBinding('class.active')
  set active(value: boolean) {
    if (this._active !== value) {
      if ((this.disabled && value) || !value) {
        if (this._active && !value) {
          this._active = value;
          return;
        }
      }
      this._active = value;
      this.tabView.items.forEach((tab) => {
        if (tab !== this) {
          tab.active = false;
        }
      });
    }
  }

  get active(): boolean {
    return this._active;
  }

  @ContentChildren(KuContentTemplate)
  templates!: QueryList<KuContentTemplate>;

  navItemTemplate: TemplateRef<any> | null = null;
  navLinkTemplate: TemplateRef<any> | null = null;
  titleTemplate: TemplateRef<any> | null = null;

  tabView: KtTabViewComponent;

  private _active = false;

  constructor(
    tabView: KtTabViewComponent,
  ) {
    this.tabView = tabView;
  }

  ngOnInit(): void {
    this.tabView.addItem(this);
  }

  ngAfterContentInit(): void {
    this.templates.forEach((item) => {
      switch (item.getType()) {
        case 'nav-item':
          this.navItemTemplate = item.template;
          break;
        case 'nav-link':
          this.navLinkTemplate = item.template;
          break;
        case 'title':
          this.titleTemplate = item.template;
          break;
      }
    });
  }

}
