import { Component, Input, OnInit } from '@angular/core';
import { KtStatBox }                from './stat-box.types';

@Component({
  selector   : 'ku-stat-box',
  templateUrl: './stat-box.component.html',
})
export class KtStatBoxComponent implements OnInit {

  @Input() data!: KtStatBox;
  @Input() loading = false;
  @Input() dark = false;

  constructor() {
  }

  ngOnInit(): void {
  }

}
