import {
  Controller,
  Post,
  Get,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  Req,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AuthGuard } from 'src/auth/auth-guard/auth.guard';
import { UploadService } from 'src/auth/upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: './uploads',
        filename: (_req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(
            null,
            `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`,
          );
        },
      }),
    }),
  )
  async uploadFiles(
    @UploadedFiles() files: Express.Multer.File[],
    @Req() req: any,
  ) {
    const userId = req.user.userId?._id;
    const saved = await this.uploadService.saveFiles(files, userId);
    return { message: 'Files uploaded', saved };
  }

  @Get()
  @UseGuards(AuthGuard)
  async getAllUploads(@Req() req: any) {
    const userId = req.user.userId || req.user.sub;
    return this.uploadService.getAllForUser(userId);
  }
}
