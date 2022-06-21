export interface OptionItem {
  id: string;
  text?: string;
  selected?: boolean;
  data?: any;
  styleClass?: any;
}

export interface OptionGroup {
  text: string;
  items: OptionItem[];
  data?: any;
  styleClass?: any;
}
