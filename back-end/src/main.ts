import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './app.module.js';
import session from 'express-session';
import { RedisStore } from 'connect-redis';
import { createClient } from 'redis'; // Stable standard client driver

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });

  // 1. Initialize the external Redis client connection
  const redisClient = createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379', // Fallback to local container port
  });

  redisClient.on('error', (err) => {
    console.error('❌ Redis Connection Failure:', err); // Catch leaks/network issues safely
  });

  // Connect to the memory engine store asynchronously before starting app pipelines
  await redisClient.connect();

  // 2. Instantiate and point express-session to use the Redis database
  app.use(
    session({
      store: new RedisStore({ 
        client: redisClient, 
        prefix: 'sess:', // Structural grouping pattern for keys inside Redis
      }),
      secret: process.env.SESSION_SECRET || 'fallback-temporary-secret', // Must be a cryptographically sound key string
      resave: false, // Prevents unnecessary persistent operations when sessions remain untouched
      saveUninitialized: false, // Eliminates empty anonymous memory footprints
      cookie: {
        maxAge: 86400000, // Explicit Time-To-Live matching: 24 Hours
        httpOnly: true, // Shields tokens against basic cross-site-scripting extraction attacks
        secure: process.env.NODE_ENV === 'production', // Requires SSL connection layer
        sameSite: 'lax', // Secures cookie contextual access limits against CSRF
      },
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}

await bootstrap();
