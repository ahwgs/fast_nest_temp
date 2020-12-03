import { DelEnum } from '@/enum/common.enum';
import { UserEntity } from '@/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiException } from '@/exception/api-exception';
import { ImageCaptchaService } from '@/services/common/code/img-captcha.service';
import { RegisterDTO } from '@/dtos/user/user.dto';
import { ApiCodeEnum } from '@/enum/api-code.enum';
/*
 * 用户模块服务类
 * @Author: ahwgs
 * @Date: 2020-11-21 14:46:51
 * @Last Modified by: ahwgs
 * @Last Modified time: 2020-12-03 14:13:47
 */

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    private readonly imageCaptchaService: ImageCaptchaService,
  ) {}

  /**
   * 根据账号，账号类型查询用户
   * @param account
   * @param accountType
   */
  private async findUser(account: string, accountType: number) {
    const user = await this.usersRepository.findOne({
      where: { account, isDel: DelEnum.N, accountType },
    });
    return user;
  }

  /**
   * 注册
   * @param RegisterDTO 注册参数
   */
  public async register(body: RegisterDTO) {
    const { account, accountType, password } = body;
    const check = await this.findUser(account, accountType);
    if (check) {
      throw new ApiException('当前账户已存在', ApiCodeEnum.WARN);
    }
  }
}
