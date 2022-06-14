import { Injectable }           from '@angular/core';
import { KuAlertService }       from '@xinyue/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable()
export class SwalAlertService extends KuAlertService {

  public override info = (message: string, title?: string) => this.displayAlert('info', message, title);

  public override success = (message: string, title?: string) => this.displayAlert('success', message, title);

  public override question = (message: string, title?: string) => this.displayAlert('question', message, title);

  public override warning = (message: string, title?: string) => this.displayAlert('warning', message, title);

  public override error = (message: string, title?: string) => this.displayAlert('error', message, title);

  public override confirm = (message: string, title?: string) =>
    Swal.fire({
      title,
      text             : message,
      icon             : 'question',
      showCancelButton : true,
      showConfirmButton: true,
      confirmButtonText: '确认',
      cancelButtonText : '取消',
    });

  private displayAlert = (inputType: SweetAlertIcon, inputMessage: string, inputTitle?: string) =>
    Swal.fire({
      title            : inputTitle,
      text             : inputMessage,
      icon             : inputType,
      showCancelButton : true,
      showConfirmButton: false,
      cancelButtonText : '关闭',
    });
}
