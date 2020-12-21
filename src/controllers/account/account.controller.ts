import { CurrentUser } from '@/decorators/current.user';
import { AuthGuard } from '@/guard/auth.guard';
import { IAccountInfo } from '@/interfaces/account.interface';
import { AccountService } from '@/services/account/account.service';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('账号模块')
@ApiBearerAuth()
@Controller('account')
@UseGuards(AuthGuard)
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  /**
   * 获取用户信息
   * @param userId
   */
  @ApiOperation({ summary: '用户信息', description: '或者当前用户信息' })
  @Get('info')
  async getInfo(@CurrentUser('userId') userId: number): Promise<IAccountInfo> {
    return this.accountService.getUserInfo(userId);
  }
}
