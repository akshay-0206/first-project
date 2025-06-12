import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Auth } from './schema/auth.schema';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { LoginAuthDto } from './dto/login-auth.dto';
import { AccessToken } from './schema/access-token.schema';
import {
  deleteMultipleFiles,
  deleteSingleFile,
  uploadMultipleFiles,
  uploadSingleFile,
} from 'src/helper/file-service.service';
import { existsSync, unlinkSync } from 'fs';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name) private readonly authModel: Model<Auth>,
    @InjectModel(AccessToken.name)
    private readonly accessTokenModel: Model<AccessToken>,
    private readonly jwtService: JwtService,
  ) {}

  async create(files: Express.Multer.File[], createAuthDto: CreateAuthDto) {
    const images: any = [];
    if (files) {
      for (const file of files) {
        if (file.fieldname === 'avatar') {
          createAuthDto.avatar = uploadSingleFile(file, './public/auth');
        }
        if (file.fieldname === 'avatars') {
          images.push(file);
        }
      }
      createAuthDto.avatars = uploadMultipleFiles(images, './public/auth');
    }
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

//   async deleteUserFiles(userId: string) {
//   const user = await this.authModel.findById(userId);
//   if (!user) throw new NotFoundException('User not found');

//   if (user?.avatar) {
//     deleteSingleFile(user?.avatar);
//   }
//   if (user?.avatars.length > 0) {
//     deleteMultipleFiles(user?.avatars);
//   }
//   const updatedAuth = await this.authModel.findByIdAndUpdate(userId,{avatar:'',avatars:[]},{new:true});
//   return {
//     message: 'File(s) deleted successfully',
//     avatar: updatedAuth?.avatar,
//     avatars: updatedAuth?.avatars,
//   };
// }

async deleteUserFiles(filePaths: string | string[], userId: string) {
  const user = await this.authModel.findById(userId);
  if (!user) throw new NotFoundException('User not found');

  const pathsToDelete = Array.isArray(filePaths) ? filePaths : [filePaths];
  console.log(user.avatar,user.avatars)
  console.log(pathsToDelete[0] === user.avatar);
  if (pathsToDelete.length === 1) { 
    deleteSingleFile(pathsToDelete[0]);
  } else {
    deleteMultipleFiles(pathsToDelete);
  }

  if (pathsToDelete.includes(user.avatar)) {
    user.avatar = '';
  }

  if (user.avatars.length>0) {
    user.avatars = user.avatars.filter(p => !pathsToDelete.includes(p));
  }

  await user.save();

  return {
    message: 'File(s) deleted successfully',
    avatar: user.avatar,
    avatars: user.avatars,
  };
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
