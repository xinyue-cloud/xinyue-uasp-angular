import { Injectable } from '@angular/core';

/** 定义一个确认对话框服务，使用 Swal 组件实现 */
@Injectable()
export abstract class KuAlertService {

  info = (message: string, title?: string): any => {
  };

  success = (message: string, title?: string): any => {
  };

  question = (message: string, title?: string): any => {
  };

  warning = (message: string, title?: string): any => {
  };

  error = (message: string, title?: string): any => {
  };

  confirm = (message: string, title?: string): any => {
  };

  custom = (options: any, message: string, title?: string): any => {
  }

}
