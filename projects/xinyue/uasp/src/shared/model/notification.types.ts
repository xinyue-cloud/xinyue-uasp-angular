export interface KuNotification {
  id: string;
  icon?: string;
  title?: string;
  description?: string;
  time: string;
  link?: string;
  useRouter?: boolean;
  count: number;
}
