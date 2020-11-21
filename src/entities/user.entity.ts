/*
 * 用户实体类
 * @Author: ahwgs
 * @Date: 2020-11-20 20:05:46
 * @Last Modified by: ahwgs
 * @Last Modified time: 2020-11-21 13:51:25
 */

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
    comment: '主键id',
  })
  id: number;

  @Column({
    type: 'varchar',
    name: 'account',
    comment: '账号',
    default: '',
  })
  account: string;

  @Column({
    type: 'varchar',
    name: 'account_type',
    comment: '账号类型',
    default: '1',
    enum: ['1', '2', '3'],
  })
  accountType: string;
}
