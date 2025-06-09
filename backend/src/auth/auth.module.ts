import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Auth, AuthSchema } from './schema/auth.schema';
import { AccessToken, AccessTokenSchema } from './schema/access-token.schema';

@Module({
  imports:[MongooseModule.forFeature([{name:Auth.name, schema:AuthSchema},
    {name: AccessToken.name, schema: AccessTokenSchema }
  ])],
  controllers: [AuthController],
  providers: [AuthService],
}) 
export class AuthModule {}
