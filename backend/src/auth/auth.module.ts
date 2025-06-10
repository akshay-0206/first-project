import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Auth, AuthSchema } from './schema/auth.schema';
import { AccessToken, AccessTokenSchema } from './schema/access-token.schema';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './auth-guard/auth.guard';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Auth.name, schema: AuthSchema },
      { name: AccessToken.name, schema: AccessTokenSchema },
    ]),
    JwtModule
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
  exports: [AuthGuard, MongooseModule],
})
export class AuthModule {}
