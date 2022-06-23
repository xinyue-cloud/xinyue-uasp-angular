import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector   : 'uasp-applic-tabs',
  templateUrl: './applic-tabs.component.html',
})
export class ApplicTabsComponent implements OnInit {

  active = 0;
  @Input() businessKey!: string;

  // event
  @Output() onCloseMe: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  onTabClick(active: number) {
    this.active = active;
  }
}
