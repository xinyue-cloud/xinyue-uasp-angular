import { Injectable }    from '@angular/core';
import { KuTipService }  from '@xinyue/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ToastrTipService extends KuTipService {

  constructor(
    private toastr: ToastrService,
  ) {
    super();
  }

  public override info = (message: string, title?: string, options?: any): any => {
    return this.toastr.info(message, title, options);
  }

  public override success = (message: string, title?: string, options?: any): any => {
    return this.toastr.success(message, title, options);
  }

  public override error = (message: string, title?: string, options?: any): any => {
    console.error(message);
    return this.toastr.error(message, title, options);
  }

  public override warning = (message: string, title?: string, options?: any): any => {
    return this.toastr.warning(message, title, options);
  }

}
