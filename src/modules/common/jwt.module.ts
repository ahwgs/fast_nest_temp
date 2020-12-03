import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@/services/common/jwt/jwt.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [ConfigModule],
  providers: [JwtService],
  exports: [JwtService],
})
export class JwtModule {}
