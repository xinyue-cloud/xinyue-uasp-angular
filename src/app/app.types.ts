import { KuLoginUser, KuMenuItem, KuMessage, KuNotification } from "@xinyue/ui";

export interface InitialData {
  messages: KuMessage[];
  navigation: {
    sidebar: KuMenuItem[];
    header: KuMenuItem[];
  };
  notifications: KuNotification[];
  user: KuLoginUser;
}
