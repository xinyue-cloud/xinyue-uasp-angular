import { Component, HostListener, Input, NgZone, OnInit } from '@angular/core';

import { KuCarouselItemComponent } from './carousel-item.component';

@Component({
  selector   : 'div[ku-carousel]',
  templateUrl: './carousel.component.html',
  host       : {
    '[class.carousel]': 'true',
    '[class.slide]'   : 'true',
  },
})
export class KuCarouselComponent implements OnInit {

  @Input() noPause = true;
  @Input() pauseOnFocus = true;
  @Input() noWrap = false;
  @Input() showIndicators = true;

  @Input()
  set activeSlide(index: number) {
    this.selectSlide(index);
  }

  get activeSlide(): number {
    return this.activeIndex;
  }

  @Input()
  set interval(value: number) {
    this._interval = value;
    this.play();
  }

  get interval(): number {
    return this._interval;
  }

  _interval = 5000;
  slides: KuCarouselItemComponent[] = [];
  activeIndex = 0;
  isPlaying = false;
  currentInterval: any;

  constructor(
    private ngZone: NgZone,
  ) {
  }

  ngOnInit(): void {
  }

  /**
   * 重新开始自动播放内容。
   */
  private restartTimer(): void {
    this.resetTimer();
    const interval = +this.interval;
    if (!isNaN(interval) && interval > 0) {
      this.currentInterval = this.ngZone.runOutsideAngular(() => {
        return setInterval(() => {
          const nInterval = +this.interval;
          this.ngZone.run(() => {
            if (this.isPlaying && !isNaN(this.interval) && nInterval > 0 && this.slides.length > 0) {
              this.nextSlideFromInterval();
            } else {
              this.pause();
            }
          });
        }, interval);
      });
    }
  }

  nextSlideFromInterval(force = false): void {
    this.nextSlide();
  }

  /**
   * 停止自动播放内容。
   */
  private resetTimer(): void {
    if (this.currentInterval) {
      clearInterval(this.currentInterval);
      this.currentInterval = void 0;      // void 0 返回 undefined
    }
  }

  previousSlide() {
    let index = this.slides.findIndex(item => item.active);
    if (index < 0) {
      index = 0;
    } else {
      if (index <= 0) {
        if (this.noWrap) {
          return;
        }
        index = this.slides.length - 1;
      } else {
        index--;
      }
    }
    this.selectSlide(index);
  }

  nextSlide() {
    let index = this.slides.findIndex(item => item.active);
    if (index < 0) {
      index = this.slides.length - 1;
    } else {
      if ((index + 1) >= this.slides.length) {
        if (this.noWrap) {
          return;
        }
        index = 0;
      } else {
        index++;
      }
    }
    this.selectSlide(index);
  }

  addSlide(slide: KuCarouselItemComponent) {
    this.slides.push(slide);
    this.activeSlide = 0;
    this.play();
  }

  removeSlide(slide: KuCarouselItemComponent) {
    const remIndex = this.slides.indexOf(slide);
    if (remIndex >= 0) {
      this.slides.splice(remIndex, 1);
      this.previousSlide();
    }
  }

  selectSlide(index: number) {
    if (index >= 0) {
      this.slides[this.activeIndex].active = false;
      this.slides[index].active = true;
      this.activeIndex = index;
      this.restartTimer();
    }
  }

  play(): void {
    if (!this.isPlaying) {
      this.isPlaying = true;
      this.restartTimer();
    }
  }

  @HostListener('mouseenter')
  pause(): void {
    if (!this.noPause) {
      this.isPlaying = false;
      this.resetTimer();
    }
  }

  @HostListener('mouseleave')
  @HostListener('mouseup')
  mousePausePlay(): void {
    if (!this.pauseOnFocus) {
      this.play();
    }
  }

  @HostListener('focusin')
  pauseFocusIn(): void {
    if (this.pauseOnFocus) {
      this.isPlaying = false;
      this.resetTimer();
    }
  }

  @HostListener('focusout')
  pauseFocusOut(): void {
    this.play();
  }

}
