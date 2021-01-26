import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from 'src/config/app.config';
import dbConfig from 'src/config/database.config';
import { validate } from 'src/config/env.validation';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { DistributorModule } from './distributor/distributor.module';
import { HashingModule } from './hashing/hashing.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: false,
      isGlobal: true,
      load: [appConfig, dbConfig],
      validationSchema: validate(),
    }),
    DatabaseModule,
    AuthModule,
    UserModule,
    HashingModule,
    DistributorModule,
  ],
})
export class AppModule {}
