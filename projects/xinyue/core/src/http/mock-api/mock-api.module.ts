import { CommonModule }                                   from "@angular/common";
import { APP_INITIALIZER, ModuleWithProviders, NgModule } from "@angular/core";

import { KU_MOCK_API_DEFAULT_DELAY, MOCK_API_CLOSED } from "./mock-api.constants";

@NgModule({
  declarations: [],
  imports     : [
    CommonModule,
  ],
})
export class KuMockApiModule {
  static forRoot(mockApiService: any[], config?: { delay?: number, closed?: boolean }): ModuleWithProviders<KuMockApiModule> {
    return {
      ngModule : KuMockApiModule,
      providers: [
        {
          provide   : APP_INITIALIZER,
          deps      : [...mockApiService],
          useFactory: () => () => null,
          multi     : true,
        },
        {
          provide : KU_MOCK_API_DEFAULT_DELAY,
          useValue: config?.delay ?? 0,
        },
        {
          provide : MOCK_API_CLOSED,
          useValue: config?.closed,
        },
      ],
    };
  }
}
