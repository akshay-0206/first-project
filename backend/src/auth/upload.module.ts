import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UploadService } from './upload.service';
import { Upload, UploadSchema } from './schema/upload.schema';
import { UploadController } from 'uploads/upload.controller';
import { AuthModule } from './auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Upload.name, schema: UploadSchema }]),
    AuthModule,
  ],
  providers: [UploadService],
  controllers: [UploadController],
})
export class UploadModule {}
