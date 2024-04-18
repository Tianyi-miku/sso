import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IS_PUBLIC_KEY, jwtConstants } from './constants';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { CacheService } from 'src/redis/cache.serve';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private cacheService: CacheService, private reflector: Reflector) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      // 💡 查看此条件
      return true;
    }

    const request = context.switchToHttp().getRequest();
    // const token = this.extractTokenFromHeader(request);
    const token = request.headers.token
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      // const payload = await this.jwtService.verifyAsync(token, {
      //   secret: jwtConstants.secret,
      // });
      const payload = await this.cacheService.get(token)
      request['user'] = payload;
      // 💡 在这里我们将 payload 挂载到请求对象上
      // 以便我们可以在路由处理器中访问它
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
