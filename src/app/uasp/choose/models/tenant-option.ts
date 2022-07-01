export interface CoOption<T> {
  title?: string;
  url?: string;
  method?: 'GET' | 'POST';
  multiple?: boolean;
  condition?: any;
  candidate?: T[];
  selected?: T[];
}
