export interface KuMessage {
  id: string;
  avatar: string;
  title: string;
  description: string;
  time: string;
  starColor: string;
  link?: string;
  useRouter?: boolean;
  read?: boolean;
}
