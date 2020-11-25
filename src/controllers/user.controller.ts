import { UserService } from '@/services/user.service';
import { Controller } from '@nestjs/common';

/*
 * 用户模块控制器
 * @Author: ahwgs
 * @Date: 2020-11-21 14:46:44
 * @Last Modified by: ahwgs
 * @Last Modified time: 2020-11-21 14:51:48
 */

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
}
