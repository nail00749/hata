import { CallHandler, ExecutionContext, Inject, mixin, NestInterceptor, Optional, Type } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Multer } from 'multer';
import FastifyMulter from 'fastify-multer';

type MulterInstance = any;

export function FileInterceptor(fieldName: string, localOptions: any): Type<NestInterceptor> {
  class MixinInterceptor implements NestInterceptor {
    protected multer: MulterInstance
    constructor(@Optional()
                @Inject('MULTER_MODULE_OPTIONS')
                  options: Multer,
    ) {
      this.multer = (FastifyMulter as any)({ ...options, ...localOptions });
    }

    async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> {
      const ctx = context.switchToHttp();
      await new Promise<void>((resolve, reject) =>
        this.multer.single(fieldName)(
          ctx.getRequest(),
          ctx.getResponse(),
          (error: any) => {
            if (error) {
              // const error = transformException(err);
              return reject(error);
            }
            resolve();
          },
        ),
      );

      return next.handle();
    }

  }

  const Interceptor = mixin(MixinInterceptor);
  return Interceptor;
}
