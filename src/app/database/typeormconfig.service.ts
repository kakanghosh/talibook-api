import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export default class TypeOrmConfigService implements TypeOrmOptionsFactory {
  commonConfig: TypeOrmModuleOptions;

  constructor(private readonly configService: ConfigService) {
    this.commonConfig = {
      name: 'default',
      type: 'postgres',
      host: this.configService.get('DATABASE_HOST'),
      port: this.configService.get('DATABASE_PORT'),
      username: this.configService.get('DATABASE_USERNAME'),
      password: this.configService.get('DATABASE_PASSWORD'),
      database: this.configService.get('DATABASE_NAME'),
      migrations: [`dist/migrations/*.js`],
      migrationsRun: this.configService.get('DATABASE.MIGRATIONS_RUN'),
      synchronize: false,
      autoLoadEntities: true,
    };
  }

  createTypeOrmOptions(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    connectionName?: string,
  ): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    if (this.configService.get('APP.ENV') === 'production') {
      return this.getProductionSettings();
    } else {
      return this.getDevelopmentSettings();
    }
  }

  private getDevelopmentSettings() {
    return {
      ...this.commonConfig,
    };
  }

  private getProductionSettings() {
    return {
      ...this.commonConfig,
      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
    };
  }
}
