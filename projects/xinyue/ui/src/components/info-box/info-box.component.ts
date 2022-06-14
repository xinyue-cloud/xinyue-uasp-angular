import { Component, Input, OnInit } from '@angular/core';
import { KuInfoBox }                from './info-box.types';

@Component({
  selector   : 'ku-info-box',
  templateUrl: './info-box.component.html',
})
export class KuInfoBoxComponent implements OnInit {

  @Input() data!: KuInfoBox;
  @Input() shadowClass?: 'shadow-none' | 'shadow-sm' | 'shadow' | 'shadow-lg' | string;

  constructor() {
  }

  ngOnInit(): void {
  }

}
