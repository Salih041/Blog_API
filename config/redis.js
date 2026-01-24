import Redis from "ioredis";

if (!process.env.REDIS_URL) {
    console.warn("No REDIS_URL,");
}

export const redis = new Redis(process.env.REDIS_URL ?? null);