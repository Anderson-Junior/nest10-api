import { Module } from '@nestjs/common';
import { VideosService } from './videos.service';
import { VideosController } from './videos.controller';
import { MulterModule } from '@nestjs/platform-express';
import multer = require('multer');
import path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'upload/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + Math.random() + path.extname(file.originalname));
  },
});
@Module({
  imports: [
    MulterModule.register({
      storage,
    }),
  ],
  controllers: [VideosController],
  providers: [VideosService],
})
export class VideosModule {}
