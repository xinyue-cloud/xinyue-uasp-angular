import { Component, Input, OnInit } from '@angular/core';
import { TabState }                 from '../types';

@Component({
  selector   : 'uasp-applic-tab',
  templateUrl: './applic-tab.component.html',
})
export class ApplicTabComponent implements OnInit {

  @Input() state!: TabState;

  constructor() {
  }

  ngOnInit(): void {
  }

}
