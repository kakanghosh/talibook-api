import * as Joi from '@hapi/joi';

export function validate() {
  return Joi.object({
    APP_ENV: Joi.string()
      .valid('production', 'development')
      .default('development'),
    HTTP_PROTOCOL: Joi.string().valid('http', 'https').default('http'),
    PORT: Joi.number().default(8000),
    HOST_NAME: Joi.string().default('localhost'),
    DATABASE_HOST: Joi.string().default('localhost'),
    DATABASE_PORT: Joi.number().default('5432'),
    DATABASE_USERNAME: Joi.string().default('postgres'),
    DATABASE_PASSWORD: Joi.string().default('postgres'),
    DATABASE_NAME: Joi.string().default('TEST_DB'),
  });
}
