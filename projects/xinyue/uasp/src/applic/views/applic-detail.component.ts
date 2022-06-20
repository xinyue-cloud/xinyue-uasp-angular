import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector   : 'uasp-applic-detail',
  templateUrl: './applic-detail.component.html',
})
export class ApplicDetailComponent implements OnInit {

  active = 0;
  @Input() businessKey!: string;

  constructor() {
  }

  ngOnInit(): void {
  }

  onTabClick(active: number) {
    this.active = active;
  }
}
