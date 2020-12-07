/*
 * @Author: ahwgs
 * @Date: 2020-12-05 00:02:03
 * @Last Modified by: ahwgs
 * @Last Modified time: 2020-12-05 00:03:39
 */

import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { IEmailParams } from '@/interfaces/common.interface';

@Injectable()
export class EmailCodeService {
  constructor(private readonly mailerService: MailerService) {}
  /**
   * 邮箱发送
   * @param params IEmailParams
   */
  public async sendEmail(params: IEmailParams) {
    const { to, title, content, template, context } = params;
    return await this.mailerService.sendMail({
      to: to,
      subject: title,
      text: content,
      template,
      context,
    });
  }
}
