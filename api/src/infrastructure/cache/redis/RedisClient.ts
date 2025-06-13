import { createClient } from 'redis';

const redis = createClient({
  url: `redis://${process.env.REDIS_HOST || 'localhost'}:${process.env.REDIS_PORT || 6379}`
});

redis.connect();

export const cacheClient = {
  async get(id: string) {
    const data = await redis.get(id);
    return data ? JSON.parse(data) : null;
  },
  async set(id: string, value: any) {
    await redis.set(id, JSON.stringify(value), {
      EX: 60 * 5
    });
  }
};