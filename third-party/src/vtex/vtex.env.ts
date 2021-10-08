import * as dotenv from 'dotenv';

dotenv.config();

const env = {
  VTEX_API_BASE_URL: process.env.VTEX_API_BASE_URL as string,
};

export default Object.freeze(env);
