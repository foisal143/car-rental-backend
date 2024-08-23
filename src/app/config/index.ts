import dotenv from 'dotenv';
dotenv.config();

export const config = {
  db_url: process.env.DB_URL,
  bcrypt_salt: process.env.BCRYPT_SALT,
};
