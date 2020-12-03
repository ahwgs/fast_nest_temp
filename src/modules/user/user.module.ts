import { UserService } from '@/services/user/user.service';
import { Module } from '@nestjs/common';
import { UserController } from '@/controllers/user/user.controller';
import { CommonModule } from '../common/common.module';
import { EntityModule } from '../base/entitiy.module';
@Module({
  imports: [EntityModule, CommonModule],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
