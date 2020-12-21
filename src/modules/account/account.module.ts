import { Module } from '@nestjs/common';
import { CommonModule } from '../common/common.module';
import { EntityModule } from '../base/entitiy.module';
import { AccountService } from '@/services/account/account.service';
import { AccountController } from '@/controllers/account/account.controller';
@Module({
  imports: [EntityModule, CommonModule],
  providers: [AccountService],
  controllers: [AccountController],
  exports: [AccountService],
})
export class AccountModule {}
