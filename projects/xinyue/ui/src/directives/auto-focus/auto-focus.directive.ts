import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[kuAutoFocus]'
})
export class AutoFocusDirective implements OnInit {

  constructor(
    private element: ElementRef
  ) {
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.element.nativeElement.focus();
    });
  }

}
