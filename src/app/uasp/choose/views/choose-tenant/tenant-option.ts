import { TenantItem } from './tenant-item';

export class TenantOption {
  title?: string;
  url?: string;
  method?: string;
  multiple?: boolean;
  candidate?: TenantItem[];
  selected?: TenantItem[];
}
