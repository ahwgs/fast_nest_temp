import { ImageCaptchaService } from '@/services/common/code/img-captcha.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  providers: [ImageCaptchaService],
  controllers: [],
  exports: [ImageCaptchaService],
})
export class CodeModule {}
