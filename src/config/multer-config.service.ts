import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MulterModuleOptions,
  MulterOptionsFactory,
} from '@nestjs/platform-express';
//import * as Storage from 'multer-gridfs-storage';
import { GridFsStorage } from 'multer-gridfs-storage/lib/gridfs';

@Injectable()
export class GridFsMulterConfigService implements MulterOptionsFactory {
  gridFsStorage: GridFsStorage;
  constructor(private readonly configService: ConfigService) {
    this.gridFsStorage = new GridFsStorage({
      url: configService.get<string>('DB_URI'),
    });
  }

  createMulterOptions(): MulterModuleOptions {
    return {
      storage: this.gridFsStorage,
    };
  }
}
