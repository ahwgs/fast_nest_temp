import { EntityModule } from './entitiy.module';
import { UserController } from '@/controllers/user.controller';
import { UserService } from '@/services/user.service';
import { Module } from '@nestjs/common';
@Module({
  imports: [EntityModule],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
