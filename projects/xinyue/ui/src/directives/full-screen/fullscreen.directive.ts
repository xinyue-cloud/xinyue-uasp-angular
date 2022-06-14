import { DOCUMENT } from '@angular/common';
import { Directive, EventEmitter, HostListener, Inject, OnInit, Output } from '@angular/core';

import { KtDocument, KtDocumentElement } from './fullscreen.type';

@Directive({
  selector: '[kuFullscreen]',
})
export class KuFullscreenDirective implements OnInit {

  private doc: KtDocument;
  private docEl!: KtDocumentElement;

  isFullscreen!: boolean;

  @Output() changeEvent: EventEmitter<boolean> = new EventEmitter();
  @Output() openEvent: EventEmitter<any> = new EventEmitter();
  @Output() closeEvent: EventEmitter<any> = new EventEmitter();

  constructor(
    @Inject(DOCUMENT) private document: Document,
  ) {
    this.doc = document as KtDocument;
  }

  ngOnInit(): void {
    this.docEl = this.document.documentElement as KtDocumentElement;
  }

  @HostListener('click')
  toggleFullscreen(): void {
    this.isFullscreen = this.getBrowserFullscreenElement() !== null;
    if (this.isFullscreen) {
      this.closeFullscreen();
      this.closeEvent.emit();
    } else {
      this.openFullscreen();
      this.openEvent.emit();
    }
    this.changeEvent.emit(this.isFullscreen);
  }

  private getBrowserFullscreenElement(): Element | null {
    if (typeof this.doc.fullscreenElement !== 'undefined') {
      return this.doc.fullscreenElement;
    }

    if (typeof this.doc.mozFullScreenElement !== 'undefined') {
      return this.doc.mozFullScreenElement;
    }

    if (typeof this.doc.msFullscreenElement !== 'undefined') {
      return this.doc.msFullscreenElement;
    }

    if (typeof this.doc.webkitFullscreenElement !== 'undefined') {
      return this.doc.webkitFullscreenElement;
    }

    throw new Error('Fullscreen mode is not supported by this browser');
  }

  private openFullscreen(): void {
    if (this.docEl.requestFullscreen) {
      this.docEl.requestFullscreen();
      return;
    }

    // Firefox
    if (this.docEl.mozRequestFullScreen) {
      this.docEl.mozRequestFullScreen();
      return;
    }

    // Chrome, Safari and Opera
    if (this.docEl.webkitRequestFullscreen) {
      this.docEl.webkitRequestFullscreen();
      return;
    }

    // IE/Edge
    if (this.docEl.msRequestFullscreen) {
      this.docEl.msRequestFullscreen();
      return;
    }
  }

  private closeFullscreen(): void {
    if (this.doc.exitFullscreen) {
      this.doc.exitFullscreen();
      return;
    }

    // Firefox
    if (this.doc.mozCancelFullScreen) {
      this.doc.mozCancelFullScreen();
      return;
    }

    // Chrome, Safari and Opera
    if (this.doc.webkitExitFullscreen) {
      this.doc.webkitExitFullscreen();
      return;
    }

    // IE/Edge
    else if (this.doc.msExitFullscreen) {
      this.doc.msExitFullscreen();
      return;
    }
  }
}
