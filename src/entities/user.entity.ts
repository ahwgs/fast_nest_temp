/*
 * 用户实体类
 * @Author: ahwgs
 * @Date: 2020-11-20 20:05:46
 * @Last Modified by: ahwgs
 * @Last Modified time: 2020-11-26 18:52:48
 */

import { AccountEnum, SexEnum } from '@/enum/user.enum';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';
@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {
  @Column({
    type: 'varchar',
    name: 'account',
    comment: '账号',
    default: '',
    nullable: false,
  })
  account: string;

  @Column({
    type: 'varchar',
    name: 'password',
    comment: '密码',
    nullable: false,
    default: '',
  })
  password: string;

  @Column({
    type: 'enum',
    enum: AccountEnum,
    default: AccountEnum.EMAIL,
    comment: '账号类型',
  })
  accountType: AccountEnum;

  @Column({
    type: 'enum',
    enum: SexEnum,
    default: SexEnum.UNKWON,
    comment: '性别',
  })
  sex: SexEnum;
}
