export interface KuMenuItem {
  header?: string;
  code?: string;
  label?: string;
  icon?: string;
  style?: any;
  disabled?: boolean;
  divider?: boolean;
  isOpen?: boolean;
  active?: boolean;
  styleClass?: string;
  iconClass?: string;
  routerLink?: any;
  parent?: KuMenuItem;
  items?: KuMenuItem[];
  url?: string;
  target?: string;
  command?: (event?: any) => void;
  badge?: string;
  badgeClass?: string;
  show?: boolean;
}
