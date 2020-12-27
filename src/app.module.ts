import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { getConnectionOptions } from 'typeorm';

async function typeORMConfig() {
  const connectionOptions = await getConnectionOptions('default');
  Object.assign(connectionOptions, {
    entities: [`${__dirname}/**/entities/**/*{.ts,.js}`],
    migrations: [`${__dirname}/migrations/**/*{.ts,.js}`],
    subscribers: [`${__dirname}/subscribers/**/*{.ts,.js}`],
    cli: {
      entitiesDir: `${__dirname}/**/entities`,
      migrationsDir: `${__dirname}/migrations`,
      subscribersDir: `${__dirname}/subscribers`,
    },
  });
  return connectionOptions;
}
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: typeORMConfig,
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
