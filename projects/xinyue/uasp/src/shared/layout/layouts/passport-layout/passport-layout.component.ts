import { Component, OnInit } from '@angular/core';
import { KuLayoutService }   from '../../services';

@Component({
  selector   : 'ku-passport-layout',
  templateUrl: './passport-layout.component.html',
})
export class KuPassportLayoutComponent implements OnInit {

  constructor(
    public layout: KuLayoutService,
  ) {
  }

  ngOnInit(): void {
    //this.layout.bodyTextSm = true;
  }

}
