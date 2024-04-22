import { BadRequestException } from '@nestjs/common';

export function transformToBoolean(value) {
  if (value === true || value === 'true') {
    return true;
  }
  if (value === false || value === 'false') {
    return false;
  }
  throw new BadRequestException('can not parse boolean');
}
