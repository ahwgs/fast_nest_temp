export interface IAnyObject {
  [propsName: string]: any;
}

/**
 * 邮箱模版
 */
type EmailTemplateType = 'register' | 'notice';

/**
 * 邮箱参数
 */
export interface IEmailParams {
  to: string;
  title: string;
  content: string;
  template?: EmailTemplateType;
  context?: IAnyObject;
}
