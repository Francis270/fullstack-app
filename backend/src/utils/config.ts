require('dotenv').config();

export const PORT = process.env.PORT || 5000;
export const NODE_ENV = process.env.NODE_ENV || 'development';
export const SECRET_KEY = process.env.SECRET_KEY || 'secret';
export const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS!) || 8;
export const TOKEN_EXPIRING_TIME = process.env.TOKEN_EXPIRING_TIME || '1 day';
export const ADMIN_DEFAULT_PASSWORD = process.env.ADMIN_DEFAULT_PASSWORD || 'admin';
