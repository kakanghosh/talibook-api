// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require('dotenv').config();

const {
  APP_ENV,
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE_NAME,
} = config.parsed;

const prefix = APP_ENV === 'development' ? 'src' : 'dist';

const typeORMConfig = {
  name: 'default',
  type: 'postgres',
  host: DATABASE_HOST,
  port: DATABASE_PORT,
  username: DATABASE_USERNAME,
  password: DATABASE_PASSWORD,
  database: DATABASE_NAME,
  synchronize: false,
  logging: false,
  entities: [`${prefix}/**/entities/*.entity{.ts,.js}`],
  migrations: [`${prefix}/**/migrations/*{.ts,.js}`],
  subscribers: [`${prefix}/**/subscriptions/**/*{.ts,.js}`],
  cli: {
    migrationsDir: `${prefix}/migrations`,
  },
};
console.log(APP_ENV, typeORMConfig);
module.exports = typeORMConfig;
