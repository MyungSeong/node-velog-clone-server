import dotenv from 'dotenv';

dotenv.config();

const sessConfig = {
    SESS_SECRET: process.env.SESS_SECRET,
};

export default sessConfig;
