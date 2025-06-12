import { existsSync, mkdirSync, unlinkSync, writeFileSync } from 'fs';
import * as path from 'path';

const isPathExist = (directory: string) => {
  if (!existsSync(directory)) {
    mkdirSync(directory, { recursive: true });
  }
  return;
};

export const uploadSingleFile = (
  file: Express.Multer.File,
  uploadPath: string,
) => {
  isPathExist(uploadPath);

  const filePath = path.join(uploadPath, `${Date.now()}_${file.originalname}`);
  writeFileSync(filePath, file.buffer);
  return filePath;
};

export const uploadMultipleFiles = (
  files: Express.Multer.File[],
  uploadPath: string,
) => {
  return files.map((file) => uploadSingleFile(file, uploadPath));
};

export const updateSingleFile = (
  file: Express.Multer.File,
  oldFilePath: string,
  uploadPath: string,
) => {
  if (existsSync(oldFilePath)) {
    unlinkSync(oldFilePath);
  }

  return uploadSingleFile(file, uploadPath);
};

export const updateMultipleFiles = (
  files: Express.Multer.File[],
  oldFilePaths: string[],
  uploadPath: string,
) => {
  oldFilePaths.forEach((oldFilePath) => {
    if (existsSync(oldFilePath)) {
      unlinkSync(oldFilePath);
    }
  });

  return files.map((file) => uploadSingleFile(file, uploadPath));
};

export const deleteSingleFile = (filePath: string) => {
  if (existsSync(filePath)) {
    console.log(`Deleting file: ${filePath}`);
    unlinkSync(filePath);
  }
  else{
    console.log(`File does not exist: ${filePath}`);
  }
};

export const deleteMultipleFiles = (filePaths: string[]) => {
  filePaths.forEach((file) => {
    if (existsSync(file)) {
      unlinkSync(file);
       console.log(`Deleting file: ${file}`);
    }
    else{
        console.log(`File does not exist: ${file}`);
    }
  });
};
