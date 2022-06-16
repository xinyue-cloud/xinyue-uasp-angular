import { KuMenuItem }                            from '@xinyue/ui';
import { KuLoginUser, KuMessage, KuNotification } from '@xinyue/uasp';

export interface InitialData {
  messages: KuMessage[];
  navigation: {
    sidebar: KuMenuItem[];
    header: KuMenuItem[];
  };
  notifications: KuNotification[];
  user: KuLoginUser;
}
