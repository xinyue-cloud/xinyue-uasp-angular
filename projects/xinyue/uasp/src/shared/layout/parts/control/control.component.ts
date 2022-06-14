import { Component, OnInit } from '@angular/core';
import { KuLayoutService }   from '../../services/layout.service';

@Component({
  selector   : 'ku-layout-control',
  templateUrl: './control.component.html',
})
export class KuControlComponent implements OnInit {

  constructor(
    public layout: KuLayoutService,
  ) {
  }

  ngOnInit(): void {
  }

}
