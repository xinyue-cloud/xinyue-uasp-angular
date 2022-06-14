import { AfterContentInit, Component, ContentChildren, OnDestroy, OnInit, QueryList, TemplateRef } from '@angular/core';
import { Subscription }                                                                            from 'rxjs';

import { KuContentTemplate }   from '../../../apis';
import { KuBreadcrumbService } from './breadcrumb.service';
import { KtBreadcrumbItem }    from './breadcrumb.types';

@Component({
  selector   : 'ku-breadcrumb',
  templateUrl: './breadcrumb.component.html',
})
export class KuBreadcrumbComponent implements OnInit, AfterContentInit, OnDestroy {

  iconClass?: string;
  title!: string;
  subTitle?: string;
  subClass?: string;
  items: KtBreadcrumbItem[] | undefined;
  hide = false;
  subscription: Subscription;

  @ContentChildren(KuContentTemplate) templates!: QueryList<any>;
  homeTemplate!: TemplateRef<any>;

  constructor(
    private breadcrumbService: KuBreadcrumbService,
  ) {
    this.subscription = breadcrumbService.subscribe(response => {
      this.hide = !!response.hide;
      this.iconClass = response.iconClass;
      this.title = response.title;
      this.subTitle = response.subTitle
      this.subClass = response.subClass;
      this.items = response.items;
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngAfterContentInit(): void {
    this.templates.forEach((item: KuContentTemplate) => {
      switch (item.getType()) {
        case 'home':
          this.homeTemplate = item.template;
          break;
      }
    });
  }
}
