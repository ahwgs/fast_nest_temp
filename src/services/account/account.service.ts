import { UserEntity } from '@/entities/user.entity';
import { IAccountInfo } from '@/interfaces/account.interface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  /**
   * 获取用户信息
   */
  getUserInfo(userId: number) {
    const result = {} as IAccountInfo;
    console.log('userId', userId);
    return result;
  }
}
