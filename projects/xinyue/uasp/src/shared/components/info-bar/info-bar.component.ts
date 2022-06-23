import { Component, OnInit } from '@angular/core';

@Component({
  selector   : 'div[ku-info-bar]',
  templateUrl: './info-bar.component.html',
  host       : {
    '[class.info-bar]': 'true',
  },
})
export class KuInfoBarComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
