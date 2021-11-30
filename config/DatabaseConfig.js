import dotenv from 'dotenv';
import { createPool } from 'mysql2/promise';

dotenv.config();

const config = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
};

const pool = createPool(config);

export default pool;
