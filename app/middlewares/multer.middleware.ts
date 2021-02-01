import multer, { diskStorage, FileFilterCallback } from 'multer';
import { Request } from 'express';

const imageTypes = [
  'image/jpeg',
  'image/png'
]

const storage = diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, 'assets/uploads')
  },
  filename: (_req, file, callback) => {
    const data = new Date();
    const newFileName = `${data.getDay()}-${data.getMonth() + 1}-${data.getFullYear()}_${data.getTime()}__${file.originalname}`;
    callback(null, newFileName);
  }
})

const fileFilter = (_req: Request, file: Express.Multer.File, callback: FileFilterCallback) => {
  if (imageTypes.includes(file.mimetype)) {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

export const upload = multer({ 
  storage, 
  fileFilter,
  limits: {
    fieldSize: 1024 * 1024 * 5
  }
})