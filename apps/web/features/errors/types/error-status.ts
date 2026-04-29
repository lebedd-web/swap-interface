export enum E_ERROR_STATUS {
  SERVER = 500,
  VALIDATION = 422,
  BAD_REQUEST = 400,
  NOTFOUND = 404,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  MANY_REQUESTS = 429,
}

export enum E_ERROR_MESSAGE {
  NETWORK = "Network Error",
  NO_BALANCE = "no_balance",
  NOT_VALID_PROMO = "not_valid_promo",
}

export enum E_SOCKET_ERRORS {
  AUTH = "unauthorized",
}
