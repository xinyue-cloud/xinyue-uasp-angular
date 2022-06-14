export interface KuTreeNode {
  id: string;
  text: string;
  type?: string;
  checked?: boolean;
  children?: KuTreeNode[];
  data?: any;
  iconClass?: any;
  styleClass?: any;
}
