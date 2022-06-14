import { NgModule } from '@angular/core';

import { KuClipPipe } from './clip.pipe';

@NgModule({
  declarations: [
    KuClipPipe,
  ],
  exports     : [
    KuClipPipe,
  ],
})
export class KuPipesModule {
}
