import dotenv from 'dotenv';

dotenv.config();

const sessConfig = {
    SESS_NAME: process.env.SESS_NAME,
    SESS_SECRET: process.env.SESS_SECRET,
    SESS_MAXAGE: parseInt(process.env.SESS_MAXAGE) * 60000,
};

export default sessConfig;
