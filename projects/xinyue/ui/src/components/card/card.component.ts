import {
  AfterContentInit,
  Component,
  ContentChildren,
  ElementRef,
  HostBinding,
  Input,
  OnInit,
  QueryList,
  Renderer2,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';

import { KuContentTemplate } from '../../apis';

export type CardTypes = 'primary' | 'success' | 'warning' | 'danger' | string;
export type ShadowTypes = 'none' | 'sm' | 'lg' | 'shadow' | string;

@Component({
  selector     : 'ku-card, [kCard]',
  templateUrl  : './card.component.html',
  styles       : ['ku-card .card-header img { width: 100%; }'],
  host         : {
    '[class.card]': 'true',
  },
  encapsulation: ViewEncapsulation.None,
})
export class KuCardComponent implements OnInit, AfterContentInit {

  @Input() iconClass?: string;
  @Input() title?: string;

  @Input() cardType?: CardTypes;
  @Input() shadowType?: ShadowTypes;

  @Input() loading = false;
  @Input() overlayDark = true;

  @HostBinding('class.card-outline')
  @Input() outline = false;

  @HostBinding('class.card-widget')
  @Input() widget = false;

  @HostBinding('class.collapsed-card')
  @Input() collapsed = false;

  @Input() panelStyles: any;
  @Input() panelClass: any;

  @Input() headerStyles: any;
  @Input() headerClass: any;

  @Input() bodyStyles: any;
  @Input() bodyClass: any;

  @Input() footerStyles: any;
  @Input() footerClass: any;

  @ContentChildren(KuContentTemplate) templates!: QueryList<any>;

  titleTemplate: TemplateRef<any> | null = null;
  headerTemplate: TemplateRef<any> | null = null;
  loadingTemplate: TemplateRef<any> | null = null;
  toolsTemplate: TemplateRef<any> | null = null;
  bodyTemplate: TemplateRef<any> | null = null;
  footerTemplate: TemplateRef<any> | null = null;

  showCard = true;

  @HostBinding('class')
  get hostClass(): string {
    let styleClass = '';
    if (this.cardType) {
      styleClass += ' card-' + this.cardType;
    }
    if (this.shadowType) {
      if ('shadow' === this.shadowType) {
        styleClass += ' shadow';
      } else {
        styleClass += ' shadow-' + this.shadowType;
      }
    }
    if (this.panelClass) {
      styleClass += ' ' + this.panelClass;
    }
    return styleClass;
  }

  constructor(
    public el: ElementRef,
    public renderer: Renderer2,
  ) {
  }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    this.templates.forEach((item: KuContentTemplate) => {
      switch (item.getType()) {
        case 'header':
          this.headerTemplate = item.template;
          break;
        case 'title':
          this.titleTemplate = item.template;
          break;
        case 'tools':
          this.toolsTemplate = item.template;
          break;
        case 'body':
          this.bodyTemplate = item.template;
          break;
        case 'loading':
          this.loadingTemplate = item.template;
          break;
        case 'footer':
          this.footerTemplate = item.template;
          break;
      }
    });
  }

}
