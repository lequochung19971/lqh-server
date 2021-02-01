import { BaseRoutes } from '../base.route';
import { Application, Request, Response } from 'express';
import { upload } from '../../middlewares/multer.middleware';

export class UploadFileRoutes extends BaseRoutes {
  route(app: Application): void {
    app.post('/uploadFiles', upload.single('image'), async (req: Request, res: Response) => {
      console.log(req.file);
      res.status(200).json({
        fileUrl: `${req.protocol}://${req.get('host')}/${req.file.filename}`
      });
    })
  }
}