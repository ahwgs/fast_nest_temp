import { CommonText } from '@/config/module/cmomon.text';
import { ApiProperty } from '@nestjs/swagger';

/*
 * @Author: ahwgs
 * @Date: 2020-11-26 18:59:19
 * @Last Modified by: ahwgs
 * @Last Modified time: 2020-11-26 19:01:52
 */

export class DateDto {
  @ApiProperty({ description: CommonText.FRONT_DATE })
  frontDate?: Date;
  @ApiProperty({ description: CommonText.END_DATE })
  endDate?: Date;
}
