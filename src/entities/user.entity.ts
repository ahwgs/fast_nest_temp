import { PublicEntity } from './public.entity';
import { Column, Entity } from 'typeorm';
import { Exclude } from 'class-transformer';
import { AccountEnum, SexEnum } from '@/enum/user.enum';

/*
 * 用户实体类
 * @Author: ahwgs
 * @Date: 2020-11-20 20:05:46
 * @Last Modified by: ahwgs
 * @Last Modified time: 2020-12-03 16:30:40
 */

@Entity({ name: 'user' })
export class UserEntity extends PublicEntity {
  @Column({
    type: 'varchar',
    name: 'account',
    comment: '账号',
    default: '',
    nullable: false,
  })
  account: string;

  @Exclude() // 表示排除字段不返回给前端
  @Column({
    type: 'varchar',
    name: 'password',
    comment: '密码',
    nullable: false,
    default: '',
  })
  password: string;

  @Column({
    type: 'tinyint',
    default: AccountEnum.EMAIL,
    comment: '账号类型 0：邮箱 1:手机号',
    name: 'account_type',
    nullable: false,
  })
  accountType: number;

  @Column({
    type: 'tinyint',
    default: SexEnum.UNKWON,
    nullable: false,
    comment: '性别 0:男 1:女 2：未知',
  })
  sex: number;

  @Exclude() // 表示排除字段不返回给前端
  @Column({
    name: 'password_slat',
    comment: '密码盐',
    type: 'varchar',
    nullable: false,
  })
  passwordSalt: string;
}
