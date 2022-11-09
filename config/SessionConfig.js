import dotenv from 'dotenv';

dotenv.config();

const sessConfig = {
    SESS_SECRET: process.env.SESS_SECRET,
    ACCESS_KEY_EXPIRES_IN: process.env.ACCESS_KEY_EXPIRES_IN,
};

export default sessConfig;
