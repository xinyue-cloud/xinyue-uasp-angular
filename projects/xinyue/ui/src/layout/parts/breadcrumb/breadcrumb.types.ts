export interface KuBreadcrumb {
  hide?: boolean;
  iconClass?: string;
  title: string;
  subTitle?: string;
  subClass?: string;
  items?: KtBreadcrumbItem[];
}

export interface KtBreadcrumbItem {
  label?: string;
  routerLink?: any;
}
