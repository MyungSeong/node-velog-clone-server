import { createClient } from 'redis';
import dotenv from 'dotenv';
import logger from '../config/Logger';

dotenv.config();

const redisClient = createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
    legacyMode: true,
});

(async () => {
    redisClient.on('error', (err) => {
        logger.error(`Redis Client ${err.message}`);
    });

    await redisClient.connect();

    logger.info(
        `Redis Client Response from PING command: ${await redisClient.ping()}`,
    );
})();

export default redisClient;
