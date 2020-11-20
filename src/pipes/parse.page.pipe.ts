import { CommonText } from '@/shared/text';
import { ApiException } from '@/exception/api-exception';
import { ApiCodeEnum } from '@/enum/api-code.enum';
import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  HttpStatus,
} from '@nestjs/common';

@Injectable()
export class ParsePagePipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    const { data: key } = metadata;
    const val = parseFloat(value);
    if (isNaN(val) || typeof val !== 'number' || val <= 0) {
      throw new ApiException(
        `${key} ${CommonText.PARAMES_MUST_NUM}:${value}`,
        ApiCodeEnum.ERROR,
        HttpStatus.OK,
      );
    }
    return val;
  }
}
