import { existsSync, mkdir, mkdirSync, writeFile, writeFileSync } from "fs"
import * as path from "path";

const isPathExist = (directory:string) => {
    if(!existsSync(directory)){
        mkdirSync(directory,{recursive:true})
    }
    return;
}

export const uploadSingleFile = (file:Express.Multer.File,uploadPath:string) => {
    isPathExist(uploadPath);

    const filePath = path.join(uploadPath,`${Date.now()}_${file.originalname}`);
    writeFileSync(filePath,file.buffer);
    return filePath;
}