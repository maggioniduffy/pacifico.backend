import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import {
  MulterModuleOptions,
  MulterOptionsFactory,
} from '@nestjs/platform-express';
import { Connection } from 'mongoose';
import { GridFsStorage } from 'multer-gridfs-storage/lib/gridfs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GridFsMulterConfigService implements MulterOptionsFactory {
  gridFsStorage: GridFsStorage;
  constructor(
    private readonly config: ConfigService,
    @InjectConnection() private readonly mongooseConnection: Connection,
  ) {
    this.gridFsStorage = new GridFsStorage({
      url: this.config.get<string>('DB_URI'),
      db: this.mongooseConnection.db,
    });
  }

  createMulterOptions(): MulterModuleOptions {
    return {
      storage: this.gridFsStorage,
    };
  }
}
