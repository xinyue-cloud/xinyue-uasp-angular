import { Component, Input, OnInit } from '@angular/core';
import { ApplicTabState }           from '../types';

@Component({
  selector   : 'uasp-applic-tab',
  templateUrl: './applic-tab.component.html',
})
export class ApplicTabComponent implements OnInit {

  @Input() state!: ApplicTabState;

  constructor() {
  }

  ngOnInit(): void {
  }

}
