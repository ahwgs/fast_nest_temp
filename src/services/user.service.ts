import { UserEntity } from '@/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
/*
 * 用户模块服务类
 * @Author: ahwgs
 * @Date: 2020-11-21 14:46:51
 * @Last Modified by: ahwgs
 * @Last Modified time: 2020-11-30 14:08:24
 */

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}
}
