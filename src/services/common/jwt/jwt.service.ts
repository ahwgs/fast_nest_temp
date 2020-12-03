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
  public sign(payload: string | IAnyObject | Buffer): string {
    const tokenOptions = this.config.get<EnvJwtOptions>('EnvJwtOptions');
    const secretOrPrivateKey = tokenOptions.secret;
    const options: jwt.SignOptions = {
      expiresIn: tokenOptions.expiresIn,
    };
    return jwt.sign(payload, secretOrPrivateKey, options);
  }
}
