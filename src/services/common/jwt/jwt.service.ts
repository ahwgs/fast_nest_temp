import { EnvJwtOptions } from '@/config/env/jwt.config';
import { ConfigService } from '@nestjs/config';
import { IAnyObject } from '@/interfaces/common.interface';
import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';

/**
 * jwt实现类
 */
@Injectable()
export class JwtService {
  constructor(private readonly config: ConfigService) {}
  /**
   * 生成token
   * @param payload
   */
  public sign(payload: string | IAnyObject | Buffer): string {
    const tokenOptions = this.config.get<EnvJwtOptions>('EnvJwtOptions');
    const secretOrPrivateKey = tokenOptions.secret;
    const options: jwt.SignOptions = {
      expiresIn: tokenOptions.expiresIn,
    };
    return jwt.sign(payload, secretOrPrivateKey, options);
  }

  /**
   * 校验token
   * @param token
   */
  public async verifyToken(token: string) {
    try {
      const tokenOptions = this.config.get<EnvJwtOptions>('EnvJwtOptions');
      const secretOrPrivateKey = tokenOptions.secret;
      return await jwt.verify(token, secretOrPrivateKey);
    } catch (e) {
      throw e;
    }
  }
}
