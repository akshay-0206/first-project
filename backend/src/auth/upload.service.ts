import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Upload, UploadDocument } from './schema/upload.schema';
import { Schema as MongooseSchema } from 'mongoose';

@Injectable()
export class UploadService {
  constructor(
    @InjectModel(Upload.name) private uploadModel: Model<UploadDocument>,
  ) {}

  async saveFiles(
    files: Express.Multer.File[],
    userId: MongooseSchema.Types.ObjectId,
  ): Promise<UploadDocument[]> {
    const docs = files.map((file) => ({
      filename: file.filename,
      path: file.path,
      userId: userId,
    }));

    return this.uploadModel.insertMany(docs);
  }

  async getAllForUser(userId: string | MongooseSchema.Types.ObjectId) {
    return this.uploadModel.find({ userId }).sort({ createdAt: -1 }).exec();
  }
}
