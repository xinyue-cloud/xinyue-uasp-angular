/** 定义提示信息服务 */
export abstract class KuTipService {

  info = (message: string, title?: string, options?: any): any => {
  };

  success = (message: string, title?: string, options?: any): any => {
  };

  error = (message: string, title?: string, options?: any): any => {
  };

  warning = (message: string, title?: string, options?: any): any => {
  };

}
