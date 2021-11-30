import { createClient } from 'redis';
import dotenv from 'dotenv';
import logger from '../config/Logger';

dotenv.config();

const redisClient = createClient({
    /* url: `redis://
    ${process.env.REDIS_USERNAME || ''}:
    ${process.env.REDIS_PASSWORD || ''}@
    ${process.env.REDIS_HOST || 'localhost'}:
    ${process.env.REDIS_PORT || 6379}`.replace(/\n\s+/g, ''), */
    url: `redis://:198963@192.168.192.1:6380`,
});

(() => {
    console.log(
        `redis://
        ${process.env.REDIS_USERNAME || ''}:
        ${process.env.REDIS_PASSWORD || ''}@
        ${process.env.REDIS_HOST || 'localhost'}:
        ${process.env.REDIS_PORT || 6379}`.replace(/\n\s+/g, '') ===
            `redis://:198963@192.168.192.1:6380`,
    );
})();

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
