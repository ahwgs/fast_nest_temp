import { ICurrentUser } from '@/interfaces/account.interface';
import { IToken } from '@/interfaces/user.interface';
import { ApiCodeEnum } from '@/enum/api-code.enum';
import { ApiException } from '@/exception/api-exception';
import { JwtService } from '@/services/common/jwt/jwt.service';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const requestToken =
      request.headers['authtoken'] || request.headers['AuthToken'];
    if (requestToken) {
      try {
        const ret = await this.jwtService.verifyToken(requestToken);
        const { sub, account } = ret as IToken;
        const currentUser: ICurrentUser = {
          userId: sub,
          account,
        };
        request.currentUser = currentUser;
      } catch (e) {
        throw new ApiException('token格式不正确', ApiCodeEnum.ERROR);
      }
    } else {
      throw new ApiException('你还没登录,请先登录', ApiCodeEnum.SHOULD_LOGIN);
    }
    return true;
  }
}
