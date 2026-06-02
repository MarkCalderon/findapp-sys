export const ERROR_CODE = {
  USER_ALREADY_EXISTS: 'P2002',
  USER_NOT_FOUND: 'P2025',
};

export const ERROR_MESSAGE = {
  [ERROR_CODE.USER_ALREADY_EXISTS]: 'User with this email already exists',
  [ERROR_CODE.USER_NOT_FOUND]: 'User not found',
};
