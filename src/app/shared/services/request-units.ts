import { HttpRequest } from '@angular/common/http';
import { Injectable }  from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RequestUtils {

  constructor() {
  }

  public getParams(request: HttpRequest<any>, name: string): any {

  }

}
