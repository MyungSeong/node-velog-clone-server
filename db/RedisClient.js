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
    socket: {
        host: `${process.env.REDIS_HOST || 'localhost'}`,
        port: `${process.env.REDIS_PORT || 6379}`,
    },
    username: `${process.env.REDIS_USERNAME || ''}`,
    password: `${process.env.REDIS_PASSWORD || ''}`,
    legacyMode: false,
});

(async () => {
    await redisClient.connect();

    logger.info(
        `Redis Client Response from PING command: ${await redisClient.ping()}`,
    );

    redisClient.on('error', (err) => {
        logger.error(`Redis Client ${err.message}`);
    });
})();

export default redisClient;
