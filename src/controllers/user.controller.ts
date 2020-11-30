import { UserService } from '@/services';
import { Controller } from '@nestjs/common';

/*
 * 用户模块控制器
 * @Author: ahwgs
 * @Date: 2020-11-21 14:46:44
 * @Last Modified by: ahwgs
 * @Last Modified time: 2020-11-30 14:07:09
 */

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
}
