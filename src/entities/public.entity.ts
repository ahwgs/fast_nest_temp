import { DelEnum } from '@/enum/common.enum';
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  BaseEntity,
  Column,
} from 'typeorm';
import { Exclude } from 'class-transformer';

export class PublicEntity extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
    comment: '主键id',
  })
  id: number;

  @Exclude() // 表示排除字段不返回给前端
  @Column({
    nullable: false,
    name: 'is_del',
    type: 'enum',
    enum: DelEnum,
    default: DelEnum.N,
    comment: '是否删除,1表示删除,0表示正常',
  })
  isDel: DelEnum;

  @CreateDateColumn({
    type: 'timestamp',
    nullable: false,
    name: 'created_at',
    comment: '创建时间',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    nullable: false,
    name: 'updated_at',
    comment: '更新时间',
  })
  updatedAt: Date;
}
