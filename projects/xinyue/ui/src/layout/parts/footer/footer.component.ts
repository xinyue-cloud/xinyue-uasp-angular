import { AfterContentInit, Component, ContentChildren, Input, OnInit, QueryList, TemplateRef } from '@angular/core';

import { KuContentTemplate } from '../../../apis';
import { KuCopyright }       from './copyright.types';

@Component({
  selector   : 'ku-layout-footer',
  templateUrl: './footer.component.html',
})
export class KuFooterComponent implements OnInit, AfterContentInit {

  @Input() copyright!: KuCopyright;

  @ContentChildren(KuContentTemplate) templates!: QueryList<any>;
  contentTemplate!: TemplateRef<any>;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    this.templates.forEach((item: KuContentTemplate) => {
      switch (item.getType()) {
        case 'content':
          this.contentTemplate = item.template;
          break;
      }
    });
  }
}
