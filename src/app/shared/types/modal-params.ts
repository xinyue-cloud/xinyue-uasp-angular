export interface ModalParams {
  action: "NEW" | "EDIT" | "VIEW";
  caption: string;
  model?: any;
  businessKey?: string;
}
