import { PublicEntity } from './public.entity';
import { AccountEnum, SexEnum } from '@/enum';
import { Column, Entity } from 'typeorm';
import { Exclude } from 'class-transformer';

/*
 * 用户实体类
 * @Author: ahwgs
 * @Date: 2020-11-20 20:05:46
 * @Last Modified by: ahwgs
 * @Last Modified time: 2020-12-01 14:25:30
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

  @Exclude() // 表示排除字段不返回给前端
  @Column()
  passwordSalt: string;
}
