export interface KuLoginUser {
  userId?: string;
  avatar?: string;
  displayName?: string;
  about?: string;
  title?: string;
  mobiles?: {
    country?: string;
    number?: string;
    label?: string;
  }[];
}
