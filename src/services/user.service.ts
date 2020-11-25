import { UserEntity } from '@/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
/*
 * 用户模块服务类
 * @Author: ahwgs
 * @Date: 2020-11-21 14:46:51
 * @Last Modified by: ahwgs
 * @Last Modified time: 2020-11-21 14:51:05
 */

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}
}
