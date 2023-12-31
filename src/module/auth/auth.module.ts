import { ConfigService } from '@nestjs/config';
import { Global, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigJwtEnum } from '../../enum/db.enum';
import { JwtStrategy } from './jwt.strategy';
import { log } from 'console';
import CaslAbilityService from './casl-ability.service';

@Global()
@Module({
  imports: [
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService) => {
        const cJwt = configService.get('jwt');
        return {
          secret: cJwt[ConfigJwtEnum.SECRET],
          signOptions: {
            expiresIn: '1d',
          },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, CaslAbilityService],
  exports: [CaslAbilityService],
})
export class AuthModule {}
