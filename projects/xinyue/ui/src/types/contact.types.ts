export interface KuContact {
  id?: string;
  avatar?: string;
  name?: string;
  about?: string;
  details?: {
    title?: string;
    company?: string;
    birthday?: string;
    address?: string;
    emails?: {
      email?: string;
      label?: string;
    }[];
    mobiles?: {
      country?: string;
      number?: string;
      label?: string;
    }[];
  };
  attachments?: {
    media?: any[]
    docs?: any[]
    links?: any[]
  };
}
