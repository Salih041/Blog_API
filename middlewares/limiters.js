import rateLimit, {ipKeyGenerator} from "express-rate-limit";
import RedisStore from "rate-limit-redis";
import { redis } from "../config/redis.js";

export const globalLimiter = rateLimit({
    store: new RedisStore({
        sendCommand: (...args) => redis.call(...args),
        prefix: "rl:global"
    }),
    windowMs: 1 * 60 * 1000,
    max: 500,
    message: {
        status: 429,
        message: "Too many request. Please try again later"
    },
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: (req) => ipKeyGenerator(req)
})

export const authIpLimiter = rateLimit({
    store: new RedisStore({
        sendCommand: (...args) => redis.call(...args),
        prefix: "rl:auth:ip"
    }),
    windowMs: 10 * 60 * 1000,
    max: 5,
    message: {
        status: 429,
        message: "Too many auth attempts. Please try again later"
    },
    keyGenerator: (req) => ipKeyGenerator(req)
})

export const authUsernameLimiter = rateLimit({
    store: new RedisStore({
        sendCommand: (...args) => redis.call(...args),
        prefix: "rl:auth:username"
    }),
    windowMs: 10 * 60 * 1000,
    max: 5,
    message: {
        status: 429,
        message: "Too many auth attempts. Please try again later"
    },
    keyGenerator: (req) => {
        const id = req.body.username?.toLowerCase() || "unknown";
        return `${ipKeyGenerator(req)}:${id}`
    },
    skipSuccessfulRequests: true
})

export const authEmailLimiter = rateLimit({
    store: new RedisStore({
        sendCommand: (...args) => redis.call(...args),
        prefix: "rl:auth:email"
    }),
    windowMs: 10 * 60 * 1000,
    max: 5,
    message: {
        status: 429,
        message: "Too many auth attempts. Please try again later"
    },
    keyGenerator: (req) => {
        const id = req.body.email || "unknown";
        return `${ipKeyGenerator(req)}:${id}`
    }
})

export const readLimiter = rateLimit({
    store: new RedisStore({
        sendCommand: (...args) => redis.call(...args),
        prefix: "rl:read"
    }),
    windowMs: 10 * 60 * 1000,
    max: 300,
    message: {
        status: 429,
        message: "Too many requests. Please try again later"
    }
})

export const userReadLimiter = rateLimit({
    store: new RedisStore({
        sendCommand: (...args) => redis.call(...args),
        prefix: "rl:read:user"
    }),
    windowMs: 10 * 60 * 1000,
    max: 400,
    message: {
        status: 429,
        message: "Too many requests. Please try again later"
    },
    keyGenerator: (req) => {
        if (req.user?.userID) return `user:${req.user.userID}`
        else return `ip:${ipKeyGenerator(req)}`
    }
})


export const writeLimiter = rateLimit({
    store: new RedisStore({
        sendCommand: (...args) => redis.call(...args),
        prefix: "rl:write"
    }),
    windowMs: 5 * 60 * 1000,
    max: 100,
    message: {
        status: 429,
        message: "Too many requests. Please try again later"
    },
    keyGenerator: (req) => {
        if (req.user?.userID) return `user:${req.user.userID}`
        else return `ip:${ipKeyGenerator(req)}`
    }
})

export const reportLimiter = rateLimit({
    store: new RedisStore({
        sendCommand: (...args) => redis.call(...args),
        prefix: "rl:report"
    }),
    windowMs: 5 * 60 * 1000,
    max: 10,
    message: {
        status: 429,
        message: "Too many requests. Please try again later"
    },
    keyGenerator: (req) => {
        if (req.user?.userID) return `user:${req.user.userID}`
        else return `ip:${ipKeyGenerator(req)}`
    }
})

export const adminLimiter = rateLimit({
    store: new RedisStore({
        sendCommand: (...args) => redis.call(...args),
        prefix: "rl:get:report"
    }),
    windowMs: 5 * 60 * 1000,
    max: 100,
    message: {
        status: 429,
        message: "Too many requests. Please try again later"
    },
    keyGenerator: (req) => {
        if (req.user?.userID) return `user:${req.user.userID}`
        else return `ip:${ipKeyGenerator(req)}`
    }
})