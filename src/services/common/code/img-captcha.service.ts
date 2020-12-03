import { Injectable } from '@nestjs/common';
import * as svgCaptcha from 'svg-captcha';

@Injectable()
export class ImageCaptchaService {
  /**
   * 生成图形验证码
   */
  public createSvgCaptcha(length?: number) {
    const defaultLen = 4;
    const captcha: { data: any; text: string } = svgCaptcha.create({
      size: length || defaultLen,
      fontSize: 50,
      width: 100,
      height: 34,
      ignoreChars: '0o1i',
      background: '#01458E',
    });
    return captcha;
  }
}
