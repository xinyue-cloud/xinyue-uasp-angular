import { Injectable }          from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { BsModalService }      from 'ngx-bootstrap/modal';

import { ChooseTenantComponent } from '../views/choose-tenant/choose-tenant.component';
import { CoOption }              from '../models/tenant-option';
import { CoTenant }              from '../views/choose-tenant/tenant-item';

@Injectable()
export class ChooseService {

  constructor(
    private modal: BsModalService,
  ) {
  }

  tenant(options: CoOption<CoTenant>): Observable<any> {

    const ref = this.modal.show(ChooseTenantComponent, {
      class       : options.multiple ? 'modal-lg' : 'modal-md',
      animated    : false,
      initialState: {
        options: {
          title   : '选择租户',
          url     : '/tenant/choose',
          method  : 'POST',
          multiple: true,
          ...options,
        },
      },
    });
    let subject = new Subject();
    ref.content!.onClose = ((result: CoTenant | CoTenant[]) => {
      ref.hide();
      subject.next(result);
    });
    return subject.asObservable();
  }
}
