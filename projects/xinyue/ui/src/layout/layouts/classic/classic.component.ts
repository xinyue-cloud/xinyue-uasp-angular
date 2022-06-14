import { Component, ContentChildren, OnInit, QueryList, TemplateRef } from '@angular/core';

import { KuContentTemplate } from '../../../apis';
import { KuLayoutService }   from '../../services/layout.service';

@Component({
  selector   : 'ku-layout-classic',
  templateUrl: './classic.component.html',
})
export class KuClassicComponent implements OnInit {

  @ContentChildren(KuContentTemplate)
  templates!: QueryList<any>;
  breadcrumbTemplate!: TemplateRef<any>;

  constructor(
    public layout: KuLayoutService,
  ) {
  }

  ngOnInit(): void {
  }

}
