import { rateLimit } from "express-rate-limit";

export const authLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    limit: 8,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    message: {
        success: false,
        message: "Too many authentication attempts. Try again later.",
    },

})

export const otpLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    limit: 6,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    message: {
        success: false,
        message: "Too many OTP requests. Try again later.",
    },
})

export const resetLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many password reset attempts. Try again later.",
  },
});

