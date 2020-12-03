import { Module } from '@nestjs/common';
import { CodeModule } from './code.module';

/**
 * 基础服务模块
 */
@Module({
  imports: [CodeModule],
  providers: [],
  controllers: [],
  exports: [CodeModule],
})
export class CommonModule {}
