export const API = {
  BASE_ROUTE: '/api/v1',
};

export const AUTH = {
  LOGIN: 'auth/login',
};

export const USERS = {
  CREATE: '/users',
  GET_ALL: '/users',
  GET_ONE: '/users/:id',
  PROFILE: '/users/:id/profile',
  UPDATE: '/users/:id',
  DELETE: '/users/:id',
};

export const DISTRIBUTORS = {
  CREATE: '/distributors',
  GET_ALL: '/distributors',
  GET_ONE: '/distributors/:id',
  DELETE: '/distributors/:id',
};

export const SHOPS = {
  CREATE: `${DISTRIBUTORS.GET_ONE}/shops`,
  GET_ALL: `${DISTRIBUTORS.GET_ONE}/shops`,
  GET_ONE: `${DISTRIBUTORS.GET_ONE}/shops/:shopId`,
  DELETE: `${DISTRIBUTORS.GET_ONE}/shops/:shopId`,
};

export const TRANSACTIONS = {
  CREATE_TRANSACTION: `${SHOPS.GET_ONE}/transaction`,
  GET_ALL_TRANSACTION: `${SHOPS.GET_ONE}/transaction`,
  GET_ONE_TRANSACTION: `${SHOPS.GET_ONE}/transaction/:transactionId`,
};
