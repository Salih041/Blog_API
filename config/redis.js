import Redis from "ioredis";

export const redis = new Redis(process.env.REDIS_URL ??
{
    host: "127.0.0.1",
    port: 6379
});