export abstract class KuLoggerService {

  /**  输出错误消息 */
  error(message?: any, ...optionalParams: any[]): void {
  }

  /** 输出警告消息 */
  warn = (message?: any, ...optionalParams: any[]) => {
  };

  /** 输出提示消息 */
  info = (message?: any, ...optionalParams: any[]) => {
  };

  /**  输出调试消息 */
  debug = (message?: any, ...optionalParams: any[]) => {
  };

  /**  输出普通消息 */
  log = (message?: any, ...optionalParams: any[]) => {
  };
}
