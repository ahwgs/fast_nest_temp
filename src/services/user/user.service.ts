import { RedisTemp } from '@/config/module/redis-temp';
import { RedisCacheService } from '@/services/common/redis/redis.cache.service';
import { DelEnum } from '@/enum/common.enum';
import { UserEntity } from '@/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiException } from '@/exception/api-exception';
import { ImageCaptchaService } from '@/services/common/code/img-captcha.service';
import { RegisterDTO, LoginDTO } from '@/dtos/user/user.dto';
import { ApiCodeEnum } from '@/enum/api-code.enum';
import * as bcrypt from 'bcrypt';
import { getUUID } from '@/utils/common';
import { Logger } from '@/utils/log4js';
import { AccountEnum } from '@/enum/user.enum';
import { IToken } from '@/interfaces/user.interface';
import { JwtService } from '@/services/common/jwt/jwt.service';
/*
 * 用户模块服务类
 * @Author: ahwgs
 * @Date: 2020-11-21 14:46:51
 * @Last Modified by: ahwgs
 * @Last Modified time: 2020-12-04 00:20:11
 */

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    private readonly imageCaptchaService: ImageCaptchaService,
    private readonly redisService: RedisCacheService,
    private readonly jwt: JwtService,
  ) {}

  /**
   * 生成token
   * @param payload
   */
  private signToken(payload: IToken) {
    return this.jwt.sign(payload);
  }

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
   *
   * @param loginPwd 检查密码是否相同
   * @param sourcePwd
   */
  private async checkPassword(loginPwd: string, sourcePwd: string) {
    return await bcrypt.compare(loginPwd, sourcePwd);
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
    const time = 5 * 60;
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
    const { account, accountType, password, code } = body;

    // 根据accountType 校验验证码
    if (accountType === AccountEnum.EMAIL) {
    } else if (accountType === AccountEnum.TEL) {
    }

    // 校验账户是否存在
    const check = await this.findUser(account, accountType);
    if (check) {
      throw new ApiException('当前账户已存在', ApiCodeEnum.ERROR);
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

  /**
   * 登录
   * @param body LoginDTO
   */
  public async login(body: LoginDTO) {
    const { account, accountType, password, code, codeId } = body;
    // 校验图形验证码
    const checkCode = await this.chenckImageCaptcha(code, codeId);
    if (!checkCode) {
      throw new ApiException('图形验证码不正确', ApiCodeEnum.ERROR);
    }
    // 校验账户是否存在
    const user = await this.findUser(account, accountType);
    if (!user) {
      throw new ApiException('当前账户不存在', ApiCodeEnum.ERROR);
    }
    const { password: sourcePwd } = user;
    const checkPwd = await this.checkPassword(password, sourcePwd);
    if (!checkPwd) {
      throw new ApiException('请检查你的用户名与密码', ApiCodeEnum.ERROR);
    }
    // 登录成功 给token
    const { id } = user || {};
    const tokenPayload: IToken = {
      account,
      sub: id,
    };
    return await this.signToken(tokenPayload);
  }
}
