/**
 * @Author Yang (yang dong nan)
 * @Date 2023年9月4日 13:35:18
 * @LastEditorAuthors yangdongnan
 * @LastDate 2023年9月4日 13:35:18
 * @Description 扩展jwt AuthGuard 守卫
 */

import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { DecoratorEnum } from '../enum/decorator.enum';

// 要使用nestjs的DI系统类，就需要Injectable注解标记
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext): any {
    // this.reflector 获取指定key的元数据
    const isPublic = this.reflector.getAllAndOverride(DecoratorEnum.IS_PUBLIC, [
      // 路由名
      context.getHandler(),
      // 模块名
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    return super.canActivate(context);
  }
}
