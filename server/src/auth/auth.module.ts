import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { RefreshStrategy } from './refresh.strategy';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    PassportModule,
    PassportModule.register({
        defaultStrategy: 'cookie-strategy'
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '15m',
      },
    }),
    MailModule
  ],
  providers: [AuthService, JwtStrategy, RefreshStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {
}
