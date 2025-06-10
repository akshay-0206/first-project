import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AccessToken } from '../schema/access-token.schema';

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private jwtService:JwtService,
        @InjectModel(AccessToken.name) private readonly accessTokenModel:Model<AccessToken>
    ){}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;
        if(!authHeader || !authHeader.startsWith('Bearer ')){
            throw new UnauthorizedException('Token is required!');
        }
        
        const token = authHeader.split(' ')[1];
        let payload;

       try {
      payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
    } catch (e) {
      throw new UnauthorizedException('Token invalid or expired');
    }

    const tokenRecord = await this.accessTokenModel.findOne({ userId: payload._id });

    if (!tokenRecord || tokenRecord.token !== token) {
      throw new UnauthorizedException('Session timed out.');
    }

    request.user = payload;

        return true;
    }
}