import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Auth } from './schema/auth.schema';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { LoginAuthDto } from './dto/login-auth.dto';
import { AccessToken } from './schema/access-token.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name) private readonly authModel: Model<Auth>,
    @InjectModel(AccessToken.name)
    private readonly accessTokenModel: Model<AccessToken>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createAuthDto: CreateAuthDto) {
    const isAuthExist = await this.authModel.findOne({
      email: createAuthDto?.email,
    });
    if (isAuthExist) {
      throw new UnprocessableEntityException('User Already Exist!');
    }

    const hashedPassword = await bcrypt.hash(createAuthDto.password, 10);
    return await this.authModel.create({
      ...createAuthDto,
      password: hashedPassword,
    });
  }

  async login(loginAuthDto: LoginAuthDto) {
    const isAuthExist = await this.authModel.findOne({
      email: loginAuthDto?.email,
    });
    if (!isAuthExist) {
      throw new UnprocessableEntityException('User not Exist!');
    }

    const isPasswordMatched = await bcrypt.compare(
      loginAuthDto.password,
      isAuthExist?.password,
    );
    if (!isPasswordMatched) {
      throw new UnprocessableEntityException('Invalid Credentials');
    }

    const token = await this.jwtService.signAsync(
      { _id: isAuthExist._id, email: isAuthExist.email },
      { secret: process.env.JWT_SECRET, expiresIn: '1d' },
    );
    await this.accessTokenModel.deleteMany({ userId: isAuthExist._id });
    await this.accessTokenModel.create({
      userId: isAuthExist._id,
      token: token,
    });

    return {
      message: 'Logged In Successfully',
      _id: isAuthExist._id,
      email: isAuthExist.email,
      name: isAuthExist.name,
      phone: isAuthExist?.phone,
      token: token,
    };
  }

  async logout(isAuthExist: string) {
    await this.authModel.findByIdAndUpdate(isAuthExist, { token: null });
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
