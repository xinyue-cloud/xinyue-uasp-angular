export interface KuAttachment {
  id?: string;
  name: string;
  type: 'media' | 'doc' | 'link' | string;
  size: number;
  url: string;
}
