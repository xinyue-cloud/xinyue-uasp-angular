export interface KuOptionItem {
  id: string;
  text?: string;
  selected?: boolean;
  data?: any;
  styleClass?: any;
}

export interface KuOptionGroup {
  text: string;
  items: KuOptionItem[];
  data?: any;
  styleClass?: any;
}
