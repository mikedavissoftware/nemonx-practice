import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './app.module.js';
import session from 'express-session';
import { RedisStore } from 'connect-redis';
import { createClient } from 'redis';
async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        instrument: ObserveInstrument,
    });
    const redisClient = createClient({
        url: process.env.REDIS_URL || 'redis://localhost:6379',
    });
    redisClient.on('error', (err) => {
        console.error('❌ Redis Connection Failure:', err);
    });
    await redisClient.connect();
    app.use(session({
        store: new RedisStore({
            client: redisClient,
            prefix: 'sess:',
        }),
        secret: process.env.SESSION_SECRET || 'fallback-temporary-secret',
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 86400000,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
        },
    }));
    await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
//# sourceMappingURL=main.js.map