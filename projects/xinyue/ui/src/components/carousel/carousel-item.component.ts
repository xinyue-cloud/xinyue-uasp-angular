import { Component, Input, OnInit } from '@angular/core';
import { KuCarouselComponent }      from './carousel.component';

@Component({
  selector: 'ku-carousel-item,[ku-carousel-item]',
  template: '<ng-content></ng-content>',
  host    : {
    '[class.carousel-item]': 'true',
    '[class.active]'       : 'active',
  },
})
export class KuCarouselItemComponent implements OnInit {

  @Input() active!: boolean;

  constructor(
    private carousel: KuCarouselComponent,
  ) {
  }

  ngOnInit(): void {
    this.carousel.addSlide(this);
  }

}
