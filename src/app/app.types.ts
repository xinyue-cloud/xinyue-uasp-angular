import { KuMenuItem }                           from '@xinyue/ui';
import { KuProfile, KuMessage, KuNotification } from '@xinyue/uasp';

export interface InitialData {
  messages: KuMessage[];
  mainMenu: KuMenuItem[];
  notifications: KuNotification[];
  profile: KuProfile;
}
