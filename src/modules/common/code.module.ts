import { EmailCodeService } from '@/services/common/code/email-code.service';
import { ImageCaptchaService } from '@/services/common/code/img-captcha.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  providers: [ImageCaptchaService, EmailCodeService],
  controllers: [],
  exports: [ImageCaptchaService, EmailCodeService],
})
export class CodeModule {}
