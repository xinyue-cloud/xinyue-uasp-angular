export interface ManageTab<T> {
  title: string;
  isNew?: boolean;
  type?: string;
  businessKey?: string;
  modified?: boolean;
  data: T;
}
