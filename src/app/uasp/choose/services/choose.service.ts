import { Injectable }     from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';

import { ChooseTenantComponent } from '../views/choose-tenant/choose-tenant.component';
import { TenantOption }          from '../views/choose-tenant/tenant-option';
import { Observable, Subject }   from 'rxjs';

@Injectable()
export class ChooseService {

  constructor(
    private modal: BsModalService,
  ) {
  }

  tenant(options: TenantOption): Observable<any> {

    const ref = this.modal.show(ChooseTenantComponent, {
      class       : options.multiple ? 'modal-lg' : 'modal-md',
      animated    : false,
      initialState: {
        options,
      },
    });
    let subject = new Subject();
    ref.content!.onClose = ((result) => {
      ref.hide();
      subject.next(result);
    });
    return subject.asObservable();
  }
}
