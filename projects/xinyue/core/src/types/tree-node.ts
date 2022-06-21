export interface TreeNode {
  id: string;
  text: string;
  type?: string;
  checked?: boolean;
  children?: TreeNode[];
  data?: any;
  iconClass?: any;
  styleClass?: any;
}
