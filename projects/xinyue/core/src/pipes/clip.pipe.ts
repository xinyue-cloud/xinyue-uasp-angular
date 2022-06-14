import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'clip',
})
export class KuClipPipe implements PipeTransform {

  transform(value: string, len: number = 0): string {
    if (value && len > 0 && value.length > len) {
      return value.slice(0, len) + '...';
    }
    return value;
  }

}
