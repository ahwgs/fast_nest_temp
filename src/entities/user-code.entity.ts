import { PublicEntity } from './public.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'user_code' })
export class UserCodeEntity extends PublicEntity {
  @Column({
    name: 'code',
    comment: '验证码',
    nullable: false,
    default: '',
    type: 'varchar',
    length: '10',
  })
  code: string;

  @Column({
    name: 'ip',
    comment: '请求地址ip',
    nullable: false,
    default: '',
    type: 'varchar',
    length: '20',
  })
  ip: string;

  @Column({
    name: 'status',
    comment: '状态 0:未使用 1已使用',
    nullable: false,
    default: 0,
    type: 'tinyint',
  })
  status: number;

  @Column({
    type: 'varchar',
    name: 'account',
    comment: '账号',
    default: '',
    nullable: false,
  })
  account: string;
}
