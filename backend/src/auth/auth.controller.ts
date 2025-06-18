import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  UseInterceptors,
  UploadedFiles,
  Put,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { AuthGuard } from './auth-guard/auth.guard';
import { AnyFilesInterceptor } from '@nestjs/platform-express';

@Controller('auth')
export class AuthController {
  uploadService: any;
  constructor(private readonly authService: AuthService) {}

  @Post()
  @UseInterceptors(AnyFilesInterceptor())
  create(
    @Body() createAuthDto: CreateAuthDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.authService.create(files, createAuthDto);
  }

  @Post('login')
  login(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto);
  }

  @Put('update')
  @UseGuards(AuthGuard)
  @UseInterceptors(AnyFilesInterceptor())
  async updateFiles(
    @UploadedFiles() files: Express.Multer.File[],
    @Param('id') id: string,
    @Req() req: any,
    @Body('oldFilePaths') oldFilePaths: string[] | string,
  ) {
    const userId = req.user?.sub || req.user?._id;
    return this.authService.updateUserFiles(files, oldFilePaths, userId);
  }

  @Delete('delete/:id')
  @UseGuards(AuthGuard)
  async deleteFiles(
    @Body('filePaths') filePaths: string | string[],
    @Param('id') id: string,
    @Req() req: any,
  ) {
    return this.authService.deleteUserFiles(filePaths, id);
  }
  @Get()
  @UseGuards(AuthGuard)
  findAll(@Req() request: any) {
    console.log(request.user);
    return this.authService.findAll();
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  async getProfile(@Req() req: any) {
    const userId = req.user?.sub || req.user?._id;
    return this.authService.getProfile(userId);
  }

  @UseGuards(AuthGuard)
  @Post('logout')
  async logout(@Req() req) {
    await this.authService.logout(req.user._id);
    return { message: 'Session Timed Out' };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.authService.remove(+id);
  // }
}
