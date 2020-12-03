import { UserEntity } from '@/entities/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
const entityList = [UserEntity];

@Module({
  imports: [TypeOrmModule.forFeature(entityList)],
  exports: [TypeOrmModule.forFeature(entityList)],
})
export class EntityModule {}
