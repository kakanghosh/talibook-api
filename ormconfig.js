const { HOST_NAME, PORT, USER_NAME, PASSWORD, DATABASE, APP_ENV } = process.env;
const folder = APP_ENV || 'development' == 'development' ? 'src' : 'dist';
module.exports = {
  name: 'default',
  type: 'postgres',
  host: HOST_NAME || 'localhost',
  port: PORT || 5432,
  username: USER_NAME || 'postgres',
  password: PASSWORD || 'postgres',
  database: DATABASE || 'TALIBOOK_DB',
  synchronize: false,
  logging: false,
  entities: [`${folder}/**/entities/*.entity{.ts,.js}`],
  migrationsTableName: 'migration_table',
  migrations: [`${folder}/**/migrations/**/*{.ts,.js}`],
  subscribers: [`${folder}/**/subscribers/**/*{.ts,.js}`],
  cli: {
    entitiesDir: `${folder}/**/entities`,
    migrationsDir: `${folder}/migrations`,
    subscribersDir: `${folder}/subscribers`,
  },
};
