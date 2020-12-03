import { RedisTemp } from '@/config/module/redis-temp';
import { RedisCacheService } from '@/services/common/redis/redis.cache.service';
import { DelEnum } from '@/enum/common.enum';
import { UserEntity } from '@/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiException } from '@/exception/api-exception';
import { ImageCaptchaService } from '@/services/common/code/img-captcha.service';
import { RegisterDTO } from '@/dtos/user/user.dto';
import { ApiCodeEnum } from '@/enum/api-code.enum';
import * as bcrypt from 'bcrypt';
import { getUUID } from '@/utils/common';
import { Logger } from '@/utils/log4js';
/*
 * 用户模块服务类
 * @Author: ahwgs
 * @Date: 2020-11-21 14:46:51
 * @Last Modified by: ahwgs
 * @Last Modified time: 2020-12-03 19:24:25
 */

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    private readonly imageCaptchaService: ImageCaptchaService,
    private readonly redisService: RedisCacheService,
  ) {}

  /**
   * 校验图形验证码是否正确
   * @param code 验证码
   * @param codeId 验证码唯一id
   */
  private async chenckImageCaptcha(code: string, codeId: string) {
    const key = `${RedisTemp.IMAGE_CAPTCHA}${codeId}`;
    const data: string | null = await this.redisService.get(key);
    if (!data) {
      throw new ApiException('验证码已过期', ApiCodeEnum.WARN);
    }
    return code.toLocaleLowerCase() === data.toLocaleLowerCase();
  }

  /**
   * 生成hash password
   * @param pwd
   * @param slat
   */
  private async genHashPassword(pwd: string, slat: string) {
    return await bcrypt.hash(pwd, slat);
  }

  /**
   * 生成盐
   */
  private async genSalt() {
    return await bcrypt.genSalt(10);
  }

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
   * 获取图形验证码
   */
  public async createImgCaptcha() {
    // 返回地址与id给前端 前端带过来校验
    const uuid = getUUID();
    const captcha = this.imageCaptchaService.createSvgCaptcha();
    const { data, text } = captcha || {};
    Logger.info(`图形验证码：--->${uuid}----${text}`);
    const time = 5 * 60 * 60;
    this.redisService.set(`${RedisTemp.IMAGE_CAPTCHA}${uuid}`, text, time);
    // 存redis
    return {
      data,
      codeId: uuid,
    };
  }

  /**
   * 注册
   * @param RegisterDTO 注册参数
   */
  public async register(body: RegisterDTO) {
    const { account, accountType, password, code, codeId } = body;
    // 校验图形验证码

    const checkCode = await this.chenckImageCaptcha(code, codeId);
    if (!checkCode) {
      throw new ApiException('图形验证码不正确', ApiCodeEnum.WARN);
    }

    // 校验账户是否存在
    const check = await this.findUser(account, accountType);
    if (check) {
      throw new ApiException('当前账户已存在', ApiCodeEnum.WARN);
    }
    const slat = await this.genSalt();
    const hashPwd = await this.genHashPassword(password, slat);
    await this.usersRepository.insert({
      account,
      accountType,
      password: hashPwd,
      passwordSalt: slat,
    });
    return true;
  }
}
