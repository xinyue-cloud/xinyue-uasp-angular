import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[kTemplate]',
  host    : {},
})
export class KuContentTemplate {

  @Input('kTemplate')
  type!: string;

  constructor(
    public template: TemplateRef<any>,
  ) {
  }

  getType(): string {
    return this.type;
  }
}
