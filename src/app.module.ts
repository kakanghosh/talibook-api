import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { getConnectionOptions } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
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
      },
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
