import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export default class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    connectionName?: string,
  ): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    return {
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
      ssl: true,
    };
  }
}
