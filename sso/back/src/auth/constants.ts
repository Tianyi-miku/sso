
import { SetMetadata } from '@nestjs/common';

export const jwtConstants = {
  secret:
    'THIS IS MY JWT TOKEN SECRET',
};


export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const passwordConstants = {
  secret:
    'THIS IS MY PASSWORDConstants SECRET',
}