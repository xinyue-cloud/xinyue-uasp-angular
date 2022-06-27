import { CoTenant } from './tenant-item';

export interface CoTenantOption {
  title?: string;
  url?: string;
  method?: string;
  multiple?: boolean;
  condition?: any;
  candidate?: CoTenant[];
  selected?: CoTenant[];
}
