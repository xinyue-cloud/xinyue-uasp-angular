import { Component, Input }          from '@angular/core';
import { KuAccordionPanelComponent } from './accordion-panel.component';

@Component({
  selector: 'ku-accordion,[ku-accordion]',
  template: '<ng-content></ng-content>',
})
export class KuAccordionComponent {

  @Input() animate = false;
  @Input() multiSelect = false;

  panels: KuAccordionPanelComponent[] = [];

  constructor() {
  }

  closeOtherPanels(openPanel: KuAccordionPanelComponent): void {
    if (!this.multiSelect) {
      this.panels.forEach((panel: KuAccordionPanelComponent) => {
        if (panel !== openPanel) {
          panel.isOpen = false;
        }
      });
    }
  }

  addGroup(panel: KuAccordionPanelComponent): void {
    this.panels.push(panel);
  }

  removeGroup(panel: KuAccordionPanelComponent): void {
    const index = this.panels.indexOf(panel);
    if (index !== -1) {
      this.panels.splice(index, 1);
    }
  }
}
