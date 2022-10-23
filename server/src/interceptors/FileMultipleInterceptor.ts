import { CallHandler, ExecutionContext, Inject, mixin, NestInterceptor, Optional, Type } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Multer, Options } from 'multer';
import FastifyMulter from 'fastify-multer';

type MulterInstance = any

export function FileMultipleInterceptor(fieldName: string, maxCount?: number, localOptions?: Options) {
  class MixinInterceptor implements NestInterceptor {
    protected multer: MulterInstance;

    constructor(@Optional()
                @Inject('MULTER_MODULE_OPTIONS')
                  options: Multer,
    ) {
      this.multer = (FastifyMulter as any)({ ...options, ...localOptions });
    }

    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
      const ctx = context.switchToHttp();

      await new Promise<void>((resolve, reject) => {
        this.multer.array(fieldName, maxCount)(
          ctx.getRequest(),
          ctx.getResponse(),
          (err) => {
            if (err) {
              return reject(err);
            }
            resolve()
          },
        );
      });
      return next.handle()
    }
  }

  const Interceptor = mixin(MixinInterceptor)
  return Interceptor as Type<NestInterceptor>
}
